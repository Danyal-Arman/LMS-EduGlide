import { BookOpen, Github, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    courses: [
      { name: "Web Development" },
      { name: "Data Science" },
      { name: "UI/UX Design" },
      { name: "Digital Marketing" },
      { name: "Mobile Development" },
      { name: "Photography" },
    ],

    legal: [
      { name: "Privacy Policy" },
      { name: "Terms of Service" },
      { name: "Cookie Policy" },
      { name: "Accessibility" },
      { name: "Sitemap" },
    ],
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/Danyal-Arman", name: "Github" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/danyal-arman",
      name: "LinkedIn",
    },
  ];

  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="text-white" size={20} />
              </div>
              <span className="text-xl font-semibold">EduPlatform</span>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering learners and educators worldwide through innovative
              online education solutions.
            </p>
          </div>

          {/* Footer Links Sections */}
          {Object.entries(footerLinks).map(([sectionTitle, links]) => (
            <div key={sectionTitle}>
              <h4 className="text-sm font-semibold mb-4 capitalize">
                {sectionTitle}
              </h4>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} EduPlatform. All rights reserved.
          </p>
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={index}
                  href={link.href}
                  aria-label={link.name}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
