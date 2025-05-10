
export default function PrivacyPolicy() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: May 10, 2025
          </p>
        </div>
        
        <div className="prose prose-neutral dark:prose-invert">
          <p>
            At RecipeHub, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
          </p>
          
          <h2>Information We Collect</h2>
          <p>
            We collect information you provide directly to us when you create an account, such as:
          </p>
          <ul>
            <li>Your name, email address, and username</li>
            <li>Profile information, including your profile picture</li>
            <li>Recipes, ingredients, and cooking instructions you create or modify</li>
            <li>Comments and feedback you provide</li>
          </ul>
          
          <h2>How We Use Your Information</h2>
          <p>
            We use your information for various purposes, including:
          </p>
          <ul>
            <li>To provide and maintain our services</li>
            <li>To process and deliver your recipes to other users</li>
            <li>To send you notifications about collaborations and updates</li>
            <li>To respond to your comments, questions, and requests</li>
            <li>To analyze usage patterns and improve our platform</li>
          </ul>
          
          <h2>Information Sharing</h2>
          <p>
            We share your information in the following ways:
          </p>
          <ul>
            <li><strong>Public recipes:</strong> Any recipe you mark as public will be visible to all users of RecipeHub.</li>
            <li><strong>Collaborators:</strong> When you invite someone to collaborate on a recipe, they will have access to the recipe details and your username.</li>
            <li><strong>Service providers:</strong> We may share information with third-party vendors who provide services on our behalf, such as hosting and data analysis.</li>
          </ul>
          
          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
          </p>
          
          <h2>Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul>
            <li>The right to access and receive a copy of your personal information</li>
            <li>The right to correct inaccurate personal information</li>
            <li>The right to delete your personal information</li>
            <li>The right to restrict or object to processing of your personal information</li>
            <li>The right to data portability</li>
          </ul>
          
          <h2>Cookies and Similar Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to collect information about your browsing activities and preferences. You can set your browser to refuse all or some browser cookies, but this may affect your ability to use certain features of our service.
          </p>
          
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated Privacy Policy on our website or by sending you an email.
          </p>
          
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            <a href="mailto:privacy@recipehub.com" className="text-primary hover:underline">
              privacy@recipehub.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
