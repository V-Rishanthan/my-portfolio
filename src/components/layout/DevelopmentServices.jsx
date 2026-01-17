// components/DevelopmentServices.jsx
import React from 'react';
import { Smartphone, Globe } from 'lucide-react';

const DevelopmentServices = () => {
  const services = [
    {
      title: "Mobile App Development",
      icon: <Smartphone className="h-10 w-10 text-primary" />,
      description: "Build beautiful and performant cross-platform apps using React Native & Expo.",
    },
    {
      title: "Web App Development",
      icon: <Globe className="h-10 w-10 text-primary" />,
      description: "Scalable and modern web applications using React, Next.js, and modern frameworks.",
    }
  ];

  return (
    <section id='services' className="py-16" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-4 fontAntonio">
            Development Services
          </h2>
          <p className="text-lg text-gray-600 fontAntonio">
            Professional solutions for your digital needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service) => (
            <div 
              key={service.title}
              className="bg-white p-8 rounded-xl border border-primary-100 hover:border-primary-300 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-xl mb-6 mx-auto">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-black text-primary mb-3 fontAntonio">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 fontAntonio">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DevelopmentServices;