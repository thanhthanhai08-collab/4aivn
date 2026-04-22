// src/app/lien-he/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { submitContactForm } from '@/lib/contacts-action';
import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const t = useTranslations('contact');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Pre-fill form if user is logged in
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.displayName || '',
        email: currentUser.email || ''
      }));
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    const result = await submitContactForm(formData, currentUser?.uid);
    
    if (result.success) {
      setStatus('success');
      toast({
        title: t("sendSuccess"),
        description: t("sendSuccessDesc"),
      });
    } else {
      setStatus('error');
      toast({
        title: t("sendFailed"),
        description: result.error || t("sendFailedDesc"),
        variant: "destructive",
      });
      setStatus('idle'); // Reset to idle after showing error
    }
  };

  const handleSendAnother = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setStatus('idle');
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.displayName || '',
        email: currentUser.email || ''
      }));
    }
  }

  return (
    <AppLayout>
      <div className="container py-8 md:py-12">
        <Card className="max-w-5xl mx-auto shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            
            {/* Contact Info */}
            <div className="p-8 bg-muted/30">
              <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground mb-4">{t('title')}</h1>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t('description')}
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Email</h4>
                    <a href="mailto:4aivn@gmail.com" className="text-muted-foreground hover:text-primary transition-colors break-all">4aivn@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{t('phone')}</h4>
                    <a href="tel:0973490497" className="text-muted-foreground hover:text-primary transition-colors">0973.490.497</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{t('address')}</h4>
                    <p className="text-muted-foreground">{t('addressValue')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8">
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10 min-h-[300px]">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{t('successTitle')}</h3>
                  <p className="text-muted-foreground mb-6">{t('successDesc')}</p>
                  <Button 
                    onClick={handleSendAnother}
                    variant="outline"
                  >
                    {t('sendAnother')}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">{t('yourName')}</Label>
                      <Input 
                        id="name"
                        name="name"
                        required
                        type="text" 
                        placeholder={t('namePlaceholder')} 
                        value={formData.name}
                        onChange={handleChange}
                        disabled={status === 'loading'}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        name="email"
                        required
                        type="email" 
                        placeholder="email@example.com" 
                        value={formData.email}
                        onChange={handleChange}
                        disabled={status === 'loading'}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="subject">{t('subject')}</Label>
                    <Input 
                      id="subject"
                      name="subject"
                      required
                      type="text" 
                      placeholder={t('subjectPlaceholder')} 
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="message">{t('message')}</Label>
                    <Textarea 
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder={t('messagePlaceholder')} 
                      value={formData.message}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                    />
                  </div>
                  <Button 
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
                    {t('sendMessage')}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
