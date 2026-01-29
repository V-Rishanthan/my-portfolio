// components/ContactInfo.jsx
import React from 'react';
import { Mail, MessageCircle, Sparkles } from 'lucide-react';

const ContactInfo = () => {
  return (
    <section id='contact' className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-6 py-3 rounded-full text-sm font-medium mb-6 fontAntonio backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            Available for Projects
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 fontAntonio">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Connect</span>
          </h2>
          
          <p className="text-xl text-gray-300 fontAntonio">
            Have a project in mind? I'm just a message away.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Email Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 group-hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-primary to-primary-600 rounded-xl">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white fontAntonio">Email</h3>
              </div>
              
              <p className="text-gray-400 mb-4 fontAntonio">
                Perfect for detailed project discussions and proposals.
              </p>
              
              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-sm text-gray-500 mb-1 fontAntonio">Reach me directly at</p>
                  <a 
                    href="mailto:updatelogesh@gmail.com"
                    className="text-lg font-semibold text-white hover:text-primary transition-colors fontAntonio"
                  >
                    rishanthan390@gmail.com
                  </a>
                </div>
              </div>
              
              <a 
                href="mailto:rishanthan390@gmail.com"
                className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary to-primary-600 text-white py-3.5 rounded-xl font-semibold hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 fontAntonio"
              >
                Send Email
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* WhatsApp Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 group-hover:border-green-500/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white fontAntonio">WhatsApp</h3>
              </div>
              
              <p className="text-gray-400 mb-4 fontAntonio">
                Quick responses for urgent or informal communication.
              </p>
              
              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-sm text-gray-500 mb-1 fontAntonio">Send message at</p>
                  <a 
                    href="https://wa.me/763468914"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-white hover:text-green-400 transition-colors fontAntonio"
                  >
                    +94 076 346 8914
                  </a>
                </div>
              </div>
              
              <a 
                href="https://wa.me/763468914"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3.5 rounded-xl font-semibold hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 fontAntonio"
              >
                Message on WhatsApp
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Response Time */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm text-gray-300 px-8 py-4 rounded-full font-medium fontAntonio border border-gray-700">
             Response time: Usually within 6-8 hours
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;