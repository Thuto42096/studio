export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-8 text-center text-muted-foreground font-body">
        <p>&copy; {new Date().getFullYear()} ShopFront. All rights reserved.</p>
        <p className="text-sm mt-2">
          Designed with <span className="text-primary">&hearts;</span> by an expert designer.
        </p>
      </div>
    </footer>
  );
}
