// src/components/layout/site-footer.tsx
export function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0 border-t">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Clean AI Hub. Bảo lưu mọi quyền.
        </p>
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-right">
          Xây dựng bằng Next.js và Firebase.
        </p>
      </div>
    </footer>
  );
}
