
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers = [
  { id: '1', username: 'john_doe', email: 'john@example.com', password: 'password123' },
  { id: '2', username: 'jane_smith', email: 'jane@example.com', password: 'password123' }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('recipehub_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user data', error);
        localStorage.removeItem('recipehub_user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulating API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          setIsAuthenticated(true);
          localStorage.setItem('recipehub_user', JSON.stringify(userWithoutPassword));
          toast.success('Login successful!');
          resolve();
        } else {
          toast.error('Invalid email or password');
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };

  const register = async (username: string, email: string, password: string) => {
    // Simulating API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const existingUser = mockUsers.find(u => u.email === email);
        
        if (existingUser) {
          toast.error('Email already in use');
          reject(new Error('Email already in use'));
        } else {
          const newUser = {
            id: String(mockUsers.length + 1),
            username,
            email,
            password
          };
          mockUsers.push(newUser);
          
          const { password: _, ...userWithoutPassword } = newUser;
          setUser(userWithoutPassword);
          setIsAuthenticated(true);
          localStorage.setItem('recipehub_user', JSON.stringify(userWithoutPassword));
          toast.success('Registration successful!');
          resolve();
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('recipehub_user');
    toast.success('Logged out successfully!');
  };

  const updateProfile = async (data: Partial<User>) => {
    // Simulating API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (user) {
          const updatedUser = { ...user, ...data };
          setUser(updatedUser);
          localStorage.setItem('recipehub_user', JSON.stringify(updatedUser));
          toast.success('Profile updated successfully!');
        }
        resolve();
      }, 1000);
    });
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    // Simulating API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const userIndex = mockUsers.findIndex(u => u.id === user?.id);
        
        if (userIndex !== -1) {
          if (mockUsers[userIndex].password === currentPassword) {
            mockUsers[userIndex].password = newPassword;
            toast.success('Password changed successfully!');
            resolve();
          } else {
            toast.error('Current password is incorrect');
            reject(new Error('Current password is incorrect'));
          }
        } else {
          toast.error('User not found');
          reject(new Error('User not found'));
        }
      }, 1000);
    });
  };

  const deleteAccount = async () => {
    // Simulating API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const userIndex = mockUsers.findIndex(u => u.id === user?.id);
        
        if (userIndex !== -1) {
          mockUsers.splice(userIndex, 1);
        }
        
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('recipehub_user');
        toast.success('Account deleted successfully!');
        resolve();
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      register, 
      logout,
      updateProfile,
      changePassword,
      deleteAccount
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
