import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  onBackToHome?: () => void;
  showBackButton?: boolean;
}

export function Header({ onBackToHome, showBackButton = false }: HeaderProps) {
  return (
    <header className="border-b border-border/50 bg-background/95 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton && onBackToHome && (
              <button
                onClick={onBackToHome}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-[-2px] bg-muted/50 px-3 py-2 rounded-full"
                style={{ fontFamily: 'Crimson Text, Georgia, serif' }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            )}
            <h1 
              className="cursor-pointer hover:text-muted-foreground transition-colors text-2xl"
              onClick={onBackToHome}
              style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: '600' }}
            >
              The Literary Gazette
            </h1>
          </div>
          <nav className="flex items-center gap-6">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-all duration-300 px-4 py-2 rounded-full hover:bg-muted/30"
              style={{ fontFamily: 'Crimson Text, Georgia, serif' }}
            >
              About
            </a>
            {/* <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-all duration-300 px-4 py-2 rounded-full hover:bg-muted/30"
              style={{ fontFamily: 'Crimson Text, Georgia, serif' }}
            >
              Archive
            </a> */}
          </nav>
        </div>
      </div>
    </header>
  );
}