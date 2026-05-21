// src/app/admin/page.tsx
"use client";

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { useAuth } from '@/contexts/auth-context';
import { AppLayout } from '@/components/layout/app-layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { Loader2, PlusCircle, Edit, ExternalLink, RefreshCw, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { togglePostStatus, addOrUpdateItem } from '@/lib/admin-actions';
import { useToast } from '@/hooks/use-toast';
import type { Tool, AIModel, NewsArticle } from '@/lib/types';
import { format } from 'date-fns';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { getLocalized } from '@/lib/i18n-helpers';

// IMPORTANT: Replace this with your actual Admin User ID from Firebase Authentication
const ADMIN_UID = 'UTGM1t0AT2cx33zhboLnyK4atqI3';

// Sub-component for the Overview Chart
function OverviewDashboard({ tools, models, news }: { tools: Tool[], models: AIModel[], news: NewsArticle[] }) {
    const data = useMemo(() => {
        const countStatus = (items: any[]) => items.reduce((acc, item) => {
            if (item.post) acc.posted++; else acc.draft++;
            return acc;
        }, { posted: 0, draft: 0 });

        return [
            { name: 'Công cụ', "Đã đăng": countStatus(tools).posted, "Bản nháp": countStatus(tools).draft },
            { name: 'Model', "Đã đăng": countStatus(models).posted, "Bản nháp": countStatus(models).draft },
            { name: 'Tin tức', "Đã đăng": countStatus(news).posted, "Bản nháp": countStatus(news).draft },
        ];
    }, [tools, models, news]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tổng quan nội dung</CardTitle>
                <CardDescription>Số lượng mục đã đăng và bản nháp.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Đã đăng" stackId="a" fill="hsl(var(--primary))" />
                        <Bar dataKey="Bản nháp" stackId="a" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

// Generic component for displaying a table of items
function ItemTable({ title, items, collectionName, onEdit, onAddNew }: { title: string; items: any[]; collectionName: string, onEdit: (item: any) => void, onAddNew: () => void }) {
    const { toast } = useToast();
    const locale = useLocale();

    const handleToggle = async (item: any) => {
        try {
            await togglePostStatus(collectionName, item.id, item.post);
            toast({ title: 'Thành công', description: `Đã cập nhật trạng thái của "${item.name || item.title}".` });
        } catch (error) {
            toast({ title: 'Lỗi', description: (error as Error).message, variant: 'destructive' });
        }
    };
    
    const getPreviewLink = (item: any) => {
        switch (collectionName) {
            case 'tools': return { pathname: '/admin/preview/tool/[id]' as const, params: { id: item.id } };
            case 'models': return { pathname: '/admin/preview/model/[id]' as const, params: { id: item.id } };
            case 'news': return { pathname: '/admin/preview/[id]' as const, params: { id: item.id } };
            default: return '/' as const;
        }
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{title}</CardTitle>
                <Button size="sm" onClick={onAddNew}><PlusCircle className="mr-2 h-4 w-4" /> Thêm mới</Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[60%]">Tên</TableHead>
                            <TableHead className="text-center">Trạng thái</TableHead>
                            <TableHead className="text-right">Hành động</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{getLocalized(item.name || item.title, locale)}</TableCell>
                                <TableCell className="text-center">
                                    <div className="flex flex-col items-center">
                                        <Switch
                                            checked={item.post}
                                            onCheckedChange={() => handleToggle(item)}
                                            aria-label="Toggle post status"
                                        />
                                        <span className="text-xs text-muted-foreground mt-1">{item.post ? 'Đã đăng' : 'Bản nháp'}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex justify-end space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
                                            <Edit className="mr-2 h-3 w-3" /> Sửa
                                        </Button>
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={getPreviewLink(item)} target="_blank">
                                            Xem trước <ExternalLink className="ml-2 h-3 w-3" />
                                            </Link>
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                 {items.length === 0 && <p className="text-center text-muted-foreground p-4">Không có mục nào.</p>}
            </CardContent>
        </Card>
    );
}

// Form Component for Editing/Adding a Tool
// Helper to extract value from LocalizedField
function extractLocalized(field: any, lang: 'vi' | 'en'): string {
    if (!field) return '';
    if (typeof field === 'string') return lang === 'vi' ? field : '';
    if (typeof field === 'object' && field !== null) return field[lang] || '';
    return '';
}

// Helper to extract value from LocalizedArrayField → join as lines
function extractLocalizedArray(field: any, lang: 'vi' | 'en'): string {
    if (!field) return '';
    if (Array.isArray(field)) return lang === 'vi' ? field.join('\n') : '';
    if (typeof field === 'object' && field !== null) {
        const arr = field[lang];
        return Array.isArray(arr) ? arr.join('\n') : '';
    }
    return '';
}

function ToolForm({ item, onFinished }: { item?: Tool | null, onFinished: () => void }) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState('vi');

    // Common fields
    const [name, setName] = useState(item?.name || '');
    const [link, setLink] = useState(item?.link || '');
    const [logoUrl, setLogoUrl] = useState(item?.logoUrl || '');
    const [imageUrl, setImageUrl] = useState(item?.imageUrl || '');
    const [videoUrl, setVideoUrl] = useState(item?.videoUrl || '');
    const [developer, setDeveloper] = useState(item?.developer || '');

    // Bilingual fields — Vietnamese
    const [contextVi, setContextVi] = useState(extractLocalized(item?.context, 'vi'));
    const [descVi, setDescVi] = useState(extractLocalized(item?.description, 'vi'));
    const [longDescVi, setLongDescVi] = useState(extractLocalized(item?.longDescription, 'vi'));
    const [featuresVi, setFeaturesVi] = useState(extractLocalizedArray(item?.features, 'vi'));
    const [useCasesVi, setUseCasesVi] = useState(extractLocalizedArray(item?.useCases, 'vi'));
    const [whoIsItForVi, setWhoIsItForVi] = useState(extractLocalizedArray(item?.whoIsItFor, 'vi'));
    const [pricingPlansVi, setPricingPlansVi] = useState(extractLocalizedArray(item?.pricingPlans, 'vi'));

    // Bilingual fields — English
    const [contextEn, setContextEn] = useState(extractLocalized(item?.context, 'en'));
    const [descEn, setDescEn] = useState(extractLocalized(item?.description, 'en'));
    const [longDescEn, setLongDescEn] = useState(extractLocalized(item?.longDescription, 'en'));
    const [featuresEn, setFeaturesEn] = useState(extractLocalizedArray(item?.features, 'en'));
    const [useCasesEn, setUseCasesEn] = useState(extractLocalizedArray(item?.useCases, 'en'));
    const [whoIsItForEn, setWhoIsItForEn] = useState(extractLocalizedArray(item?.whoIsItFor, 'en'));
    const [pricingPlansEn, setPricingPlansEn] = useState(extractLocalizedArray(item?.pricingPlans, 'en'));

    // Convert textarea lines to string array (filter empty lines)
    const linesToArray = (text: string): string[] => text.split('\n').map(l => l.trim()).filter(Boolean);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            toast({ title: 'Lỗi', description: 'Tên công cụ là bắt buộc', variant: 'destructive' });
            return;
        }
        setIsSubmitting(true);
        try {
            const payload: any = {
                name,
                link,
                logoUrl,
                imageUrl,
                videoUrl,
                developer,
                // Bilingual Map fields
                context: { vi: contextVi, en: contextEn },
                description: { vi: descVi, en: descEn },
                longDescription: { vi: longDescVi, en: longDescEn },
                features: { vi: linesToArray(featuresVi), en: linesToArray(featuresEn) },
                useCases: { vi: linesToArray(useCasesVi), en: linesToArray(useCasesEn) },
                whoIsItFor: { vi: linesToArray(whoIsItForVi), en: linesToArray(whoIsItForEn) },
                pricingPlans: { vi: linesToArray(pricingPlansVi), en: linesToArray(pricingPlansEn) },
            };
            await addOrUpdateItem('tools', payload, item?.id);
            toast({ title: 'Thành công', description: `Đã ${item ? 'cập nhật' : 'thêm'} công cụ.` });
            onFinished();
        } catch (error) {
            toast({ title: 'Lỗi', description: (error as Error).message, variant: 'destructive' });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // Render bilingual content fields for a given language
    const renderLangFields = (lang: 'vi' | 'en') => {
        const labelPrefix = lang === 'vi' ? '🇻🇳' : '🇬🇧';
        const ctx = lang === 'vi' ? contextVi : contextEn;
        const setCtx = lang === 'vi' ? setContextVi : setContextEn;
        const desc = lang === 'vi' ? descVi : descEn;
        const setDesc = lang === 'vi' ? setDescVi : setDescEn;
        const longDesc = lang === 'vi' ? longDescVi : longDescEn;
        const setLongDesc = lang === 'vi' ? setLongDescVi : setLongDescEn;
        const feat = lang === 'vi' ? featuresVi : featuresEn;
        const setFeat = lang === 'vi' ? setFeaturesVi : setFeaturesEn;
        const uc = lang === 'vi' ? useCasesVi : useCasesEn;
        const setUc = lang === 'vi' ? setUseCasesVi : setUseCasesEn;
        const who = lang === 'vi' ? whoIsItForVi : whoIsItForEn;
        const setWho = lang === 'vi' ? setWhoIsItForVi : setWhoIsItForEn;
        const pricing = lang === 'vi' ? pricingPlansVi : pricingPlansEn;
        const setPricing = lang === 'vi' ? setPricingPlansVi : setPricingPlansEn;
        
        return (
            <div className="space-y-3">
                <div className="space-y-1">
                    <Label>{labelPrefix} Hạng mục</Label>
                    <Input value={ctx} onChange={e => setCtx(e.target.value)} placeholder={lang === 'vi' ? 'VD: Tạo video AI' : 'E.g. AI Video Generation'} />
                </div>
                <div className="space-y-1">
                    <Label>{labelPrefix} Mô tả ngắn</Label>
                    <Textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder={lang === 'vi' ? 'Mô tả bằng tiếng Việt...' : 'Description in English...'} />
                </div>
                <div className="space-y-1">
                    <Label>{labelPrefix} Mô tả chi tiết (HTML)</Label>
                    <Textarea value={longDesc} onChange={e => setLongDesc(e.target.value)} className="min-h-[120px]" placeholder={lang === 'vi' ? 'Mô tả chi tiết (HTML)...' : 'Long description (HTML)...'} />
                </div>
                <div className="space-y-1">
                    <Label>{labelPrefix} Tính năng <span className="text-xs text-muted-foreground">(mỗi dòng 1 tính năng)</span></Label>
                    <Textarea value={feat} onChange={e => setFeat(e.target.value)} className="min-h-[80px]" placeholder={lang === 'vi' ? 'Tính năng 1\nTính năng 2' : 'Feature 1\nFeature 2'} />
                </div>
                <div className="space-y-1">
                    <Label>{labelPrefix} Trường hợp sử dụng <span className="text-xs text-muted-foreground">(mỗi dòng 1 mục)</span></Label>
                    <Textarea value={uc} onChange={e => setUc(e.target.value)} className="min-h-[80px]" placeholder={lang === 'vi' ? 'Trường hợp 1\nTrường hợp 2' : 'Use case 1\nUse case 2'} />
                </div>
                <div className="space-y-1">
                    <Label>{labelPrefix} Đối tượng phù hợp <span className="text-xs text-muted-foreground">(mỗi dòng 1 mục)</span></Label>
                    <Textarea value={who} onChange={e => setWho(e.target.value)} className="min-h-[60px]" placeholder={lang === 'vi' ? 'Lập trình viên\nNhà thiết kế' : 'Developers\nDesigners'} />
                </div>
                <div className="space-y-1">
                    <Label>{labelPrefix} Gói giá <span className="text-xs text-muted-foreground">(mỗi dòng 1 gói)</span></Label>
                    <Textarea value={pricing} onChange={e => setPricing(e.target.value)} className="min-h-[60px]" placeholder={lang === 'vi' ? 'Miễn phí\nPro: $10/tháng' : 'Free\nPro: $10/month'} />
                </div>
            </div>
        );
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
            {/* Common fields */}
            <div className="space-y-1">
                <Label htmlFor="name">Tên công cụ</Label>
                <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="space-y-1">
                <Label htmlFor="developer">Nhà phát triển</Label>
                <Input id="developer" value={developer} onChange={e => setDeveloper(e.target.value)} />
            </div>
            <div className="space-y-1">
                <Label htmlFor="link">Link trang web</Label>
                <Input id="link" value={link} onChange={e => setLink(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <Label htmlFor="logoUrl">URL logo</Label>
                    <Input id="logoUrl" value={logoUrl} onChange={e => setLogoUrl(e.target.value)} />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="imageUrl">URL ảnh bìa</Label>
                    <Input id="imageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
                </div>
            </div>
            <div className="space-y-1">
                <Label htmlFor="videoUrl">URL video</Label>
                <Input id="videoUrl" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} />
            </div>

            {/* Bilingual content tabs */}
            <Separator />
            <h3 className="font-semibold text-sm text-muted-foreground">NỘI DUNG SONG NGỮ</h3>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full">
                    <TabsTrigger value="vi" className="flex-1">🇻🇳 Tiếng Việt</TabsTrigger>
                    <TabsTrigger value="en" className="flex-1">🇬🇧 English</TabsTrigger>
                </TabsList>
                <TabsContent value="vi" className="mt-3">
                    {renderLangFields('vi')}
                </TabsContent>
                <TabsContent value="en" className="mt-3">
                    {renderLangFields('en')}
                </TabsContent>
            </Tabs>

            <DialogFooter>
                <DialogClose asChild><Button type="button" variant="ghost">Hủy</Button></DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Lưu
                </Button>
            </DialogFooter>
        </form>
    );
}

// NEW: Form for News
function NewsForm({ item, onFinished }: { item?: NewsArticle | null, onFinished: () => void }) {
    const { toast } = useToast();
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<NewsArticle>({
        defaultValues: item || { title: '', author: 'Mai', source: 'Tổng hợp', imageUrl: '', content: '' },
    });

    const onSubmit = async (data: NewsArticle) => {
        try {
            await addOrUpdateItem('news', data, item?.id);
            toast({ title: 'Thành công', description: `Đã ${item ? 'cập nhật' : 'thêm'} tin tức.` });
            onFinished();
        } catch (error) {
            toast({ title: 'Lỗi', description: (error as Error).message, variant: 'destructive' });
        }
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
            <div className="space-y-1">
                <Label htmlFor="title">Tiêu đề</Label>
                <Input id="title" {...register('title', { required: 'Tiêu đề là bắt buộc' })} />
                {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
            </div>
             <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <Label htmlFor="author">Tác giả</Label>
                    <Input id="author" {...register('author')} />
                </div>
                 <div className="space-y-1">
                    <Label htmlFor="source">Nguồn</Label>
                    <Input id="source" {...register('source')} />
                </div>
             </div>
             <div className="space-y-1">
                <Label htmlFor="imageUrl">URL ảnh bìa</Label>
                <Input id="imageUrl" {...register('imageUrl')} />
            </div>
             <div className="space-y-1">
                <Label htmlFor="content">Nội dung (hỗ trợ HTML và placeholders)</Label>
                <Textarea id="content" {...register('content')} className="min-h-[250px]" />
            </div>
            <DialogFooter>
                <DialogClose asChild><Button type="button" variant="ghost">Hủy</Button></DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Lưu
                </Button>
            </DialogFooter>
        </form>
    );
}

function PlaceholderDialog({ title, open, onOpenChange }: { title: string, open: boolean, onOpenChange: (open: boolean) => void }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription className="pt-4 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                        Chức năng này đang trong quá trình phát triển.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

// Main Admin Page Component
export default function AdminPage() {
    const { currentUser, isLoading: isAuthLoading } = useAuth();
    const router = useRouter();
    const [isFetchingData, setIsFetchingData] = useState(true);
    const [tools, setTools] = useState<Tool[]>([]);
    const [models, setModels] = useState<AIModel[]>([]);
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [editingItem, setEditingItem] = useState<{ type: string; data: any } | null>(null);
    const [addingType, setAddingType] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsFetchingData(true);
        try {
            const [toolsSnapshot, modelsSnapshot, newsSnapshot] = await Promise.all([
                getDocs(query(collection(db, "tools"), orderBy("name"))),
                getDocs(query(collection(db, "models"), orderBy("name"))),
                getDocs(query(collection(db, "news"), orderBy("publishedAt", "desc"))),
            ]);
            setTools(toolsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Tool)));
            setModels(modelsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AIModel)));
            setNews(newsSnapshot.docs.map(doc => {
                 const data = doc.data();
                 return { id: doc.id, ...data, publishedAt: data.publishedAt?.toDate ? data.publishedAt.toDate().toISOString() : new Date().toISOString() } as NewsArticle
            }));
        } catch (error) {
            console.error("Failed to fetch admin data:", error);
        } finally {
            setIsFetchingData(false);
        }
    }, []);

    useEffect(() => {
        if (!isAuthLoading && !currentUser) {
            router.push('/dang-nhap');
        } else if (currentUser && currentUser.uid !== ADMIN_UID) {
            router.push('/');
        } else if (currentUser && currentUser.uid === ADMIN_UID) {
            fetchData();
        }
    }, [currentUser, isAuthLoading, router, fetchData]);
    
    const handleOnFinish = () => {
        setEditingItem(null);
        setAddingType(null);
        fetchData();
    }

    if (isAuthLoading || !currentUser || isFetchingData) {
        return <AppLayout><div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div></AppLayout>;
    }
     if (currentUser.uid !== ADMIN_UID) {
        return <AppLayout><div className="container py-12 text-center text-destructive">Bạn không có quyền truy cập trang này.</div></AppLayout>;
    }
    
    const renderEditDialog = () => {
        if (!editingItem) return null;
        switch (editingItem.type) {
            case 'tool': return <Dialog open={true} onOpenChange={() => setEditingItem(null)}><DialogContent className="sm:max-w-[600px]"><DialogHeader><DialogTitle>Chỉnh sửa Công cụ</DialogTitle></DialogHeader><ToolForm item={editingItem.data} onFinished={handleOnFinish} /></DialogContent></Dialog>;
            case 'model': return <PlaceholderDialog title="Chỉnh sửa Model" open={true} onOpenChange={() => setEditingItem(null)} />;
            case 'news': return (
                <Dialog open={true} onOpenChange={() => setEditingItem(null)}>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Chỉnh sửa Tin tức</DialogTitle>
                    </DialogHeader>
                    <NewsForm item={editingItem.data} onFinished={handleOnFinish} />
                  </DialogContent>
                </Dialog>
              );
            default: return null;
        }
    }
    
     const renderAddDialog = () => {
        if (!addingType) return null;
        switch (addingType) {
            case 'tool': return <Dialog open={true} onOpenChange={() => setAddingType(null)}><DialogContent className="sm:max-w-[600px]"><DialogHeader><DialogTitle>Thêm Công cụ mới</DialogTitle></DialogHeader><ToolForm onFinished={handleOnFinish} /></DialogContent></Dialog>;
            case 'model': return <PlaceholderDialog title="Thêm Model mới" open={true} onOpenChange={() => setAddingType(null)} />;
            case 'news': return (
                <Dialog open={true} onOpenChange={() => setAddingType(null)}>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Thêm Tin tức mới</DialogTitle>
                    </DialogHeader>
                    <NewsForm onFinished={handleOnFinish} />
                  </DialogContent>
                </Dialog>
              );
            default: return null;
        }
    }
    
    return (
        <AppLayout>
            <div className="container py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold font-headline">Trang Quản trị</h1>
                    <Button onClick={fetchData} variant="outline" size="sm" disabled={isFetchingData}>
                        <RefreshCw className={`mr-2 h-4 w-4 ${isFetchingData ? 'animate-spin' : ''}`} /> Làm mới
                    </Button>
                </div>
                
                <Tabs defaultValue="overview">
                    <TabsList>
                        <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                        <TabsTrigger value="tools">Công cụ</TabsTrigger>
                        <TabsTrigger value="models">Model</TabsTrigger>
                        <TabsTrigger value="news">Tin tức</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="mt-4">
                        <OverviewDashboard tools={tools} models={models} news={news} />
                    </TabsContent>
                    
                    <TabsContent value="tools" className="mt-4">
                        <ItemTable title="Quản lý Công cụ" items={tools} collectionName="tools" onEdit={(item) => setEditingItem({ type: 'tool', data: item })} onAddNew={() => setAddingType('tool')} />
                    </TabsContent>

                    <TabsContent value="models" className="mt-4">
                         <ItemTable title="Quản lý Model AI" items={models} collectionName="models" onEdit={(item) => setEditingItem({ type: 'model', data: item })} onAddNew={() => setAddingType('model')} />
                    </TabsContent>

                    <TabsContent value="news" className="mt-4">
                         <ItemTable title="Quản lý Tin tức" items={news} collectionName="news" onEdit={(item) => setEditingItem({ type: 'news', data: item })} onAddNew={() => setAddingType('news')} />
                    </TabsContent>
                </Tabs>

                {renderEditDialog()}
                {renderAddDialog()}
            </div>
        </AppLayout>
    );
}
