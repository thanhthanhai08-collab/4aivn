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
import type { Metadata } from 'next';

// Metadata can be defined in a layout file if needed for a client component.
// For this page, we focus on the form functionality.

export default function ContactPage() {
  const { currentUser } = useAuth();
  const { toast } = useToast();

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
        title: "Gửi thành công!",
        description: "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.",
      });
    } else {
      setStatus('error');
      toast({
        title: "Gửi thất bại",
        description: result.error || "Đã có lỗi xảy ra. Vui lòng thử lại.",
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
              <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground mb-4">Liên hệ</h1>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Bạn có thắc mắc, yêu cầu hợp tác hoặc muốn đóng góp ý kiến? 
                Hãy gửi tin nhắn cho chúng tôi, đội ngũ hỗ trợ sẽ phản hồi bạn sớm nhất có thể.
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
                    <h4 className="font-semibold text-foreground">Điện thoại</h4>
                    <a href="tel:0973490497" className="text-muted-foreground hover:text-primary transition-colors">0973.490.497</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Địa chỉ</h4>
                    <p className="text-muted-foreground">TP. Hồ Chí Minh, Việt Nam</p>
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
                  <h3 className="text-2xl font-bold mb-2">Gửi thành công!</h3>
                  <p className="text-muted-foreground mb-6">Cảm ơn bạn đã liên hệ. Chúng tôi sẽ trả lời sớm.</p>
                  <Button 
                    onClick={handleSendAnother}
                    variant="outline"
                  >
                    Gửi tin nhắn mới
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Tên của bạn</Label>
                      <Input 
                        id="name"
                        name="name"
                        required
                        type="text" 
                        placeholder="Nguyễn Văn A" 
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
                    <Label htmlFor="subject">Chủ đề</Label>
                    <Input 
                      id="subject"
                      name="subject"
                      required
                      type="text" 
                      placeholder="Hợp tác, báo lỗi..." 
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="message">Nội dung</Label>
                    <Textarea 
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Nhập tin nhắn của bạn..." 
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
                    Gửi tin nhắn
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