// src/app/admin/page.tsx
"use client";

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { AppLayout } from '@/components/layout/app-layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
            case 'tools': return `/cong-cu/${item.id}`;
            case 'models': return `/admin/preview/model/${item.id}`;
            case 'news': return `/admin/preview/${item.id}`;
            default: return '/';
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
                                <TableCell className="font-medium">{item.name || item.title}</TableCell>
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
                                    <div className="flex justify-end">
                                        <div className="flex flex-col items-stretch space-y-2 border border-border p-1 rounded-md">
                                            <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
                                                <Edit className="mr-2 h-3 w-3" /> Sửa
                                            </Button>
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={getPreviewLink(item)} target="_blank">
                                                Xem trước <ExternalLink className="ml-2 h-3 w-3" />
                                                </Link>
                                            </Button>
                                        </div>
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
function ToolForm({ item, onFinished }: { item?: Tool | null, onFinished: () => void }) {
    const { toast } = useToast();
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Tool>({
        defaultValues: item || { name: '', context: '', description: '', link: '', logoUrl: '', imageUrl: '' },
    });

    const onSubmit = async (data: Tool) => {
        try {
            const dataToSave: Partial<Tool> & {[key: string]: any} = { ...data };
            if (item?.id) {
                delete dataToSave.id;
            }
    
            await addOrUpdateItem('tools', dataToSave, item?.id);
            toast({ title: 'Thành công', description: `Đã ${item ? 'cập nhật' : 'thêm'} công cụ.` });
            onFinished();
        } catch (error) {
            toast({ title: 'Lỗi', description: (error as Error).message, variant: 'destructive' });
        }
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
            <div className="space-y-1">
                <Label htmlFor="name">Tên công cụ</Label>
                <Input id="name" {...register('name', { required: 'Tên là bắt buộc' })} />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>
             <div className="space-y-1">
                <Label htmlFor="context">Hạng mục</Label>
                <Input id="context" {...register('context')} />
            </div>
             <div className="space-y-1">
                <Label htmlFor="description">Mô tả ngắn</Label>
                <Textarea id="description" {...register('description')} />
            </div>
             <div className="space-y-1">
                <Label htmlFor="link">Link trang web</Label>
                <Input id="link" {...register('link')} />
            </div>
             <div className="space-y-1">
                <Label htmlFor="logoUrl">URL logo</Label>
                <Input id="logoUrl" {...register('logoUrl')} />
            </div>
             <div className="space-y-1">
                <Label htmlFor="imageUrl">URL ảnh bìa</Label>
                <Input id="imageUrl" {...register('imageUrl')} />
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

// NEW: Form for News
function NewsForm({ item, onFinished }: { item?: NewsArticle | null, onFinished: () => void }) {
    const { toast } = useToast();
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<NewsArticle>({
        defaultValues: item || { title: '', author: 'Mai', source: 'Tổng hợp', imageUrl: '', content: '' },
    });

    const onSubmit = async (data: NewsArticle) => {
        try {
            const dataToSave: Partial<NewsArticle> & {[key: string]: any} = { ...data };
            if (item?.id) {
                delete dataToSave.id;
            }
    
            if (item?.id && typeof dataToSave.publishedAt === 'string') {
                dataToSave.publishedAt = new Date(dataToSave.publishedAt);
            }
    
            await addOrUpdateItem('news', dataToSave, item?.id);
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
