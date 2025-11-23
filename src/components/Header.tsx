import { Sun, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <Sun className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-none">
              Солнечная радиация Беларуси
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Геоинформационная система
            </p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Анализ
          </Button>
          <Button variant="ghost" size="sm">
            Статистика
          </Button>
          <Button variant="ghost" size="sm">
            О проекте
          </Button>
        </div>
        
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
