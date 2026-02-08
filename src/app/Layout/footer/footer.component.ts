import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-gray-900 text-gray-400 py-12 px-8 border-t border-white/5 mt-auto">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div class="col-span-1 md:col-span-1">
          <div class="flex items-center gap-2 mb-6">
            <div class="w-8 h-8 bg-gradient-to-tr from-orange-500 to-pink-600 rounded flex items-center justify-center">
              <span class="text-white font-bold text-xs">RH</span>
            </div>
            <span class="text-xl font-bold text-white">Radio Hub</span>
          </div>
          <p class="text-sm leading-relaxed">
            Tu conexión directa con la mejor música y noticias. Transmitiendo 24/7 para todo el mundo.
          </p>
        </div>

        <div>
           <h3 class="text-white font-bold mb-4">Navegación</h3>
           <ul class="space-y-2 text-sm">
             <li><a href="#" class="hover:text-orange-400 transition-colors">Inicio</a></li>
             <li><a href="#" class="hover:text-orange-400 transition-colors">Programación</a></li>
             <li><a href="#" class="hover:text-orange-400 transition-colors">Podcast</a></li>
             <li><a href="#" class="hover:text-orange-400 transition-colors">Publicidad</a></li>
           </ul>
        </div>

        <div>
           <h3 class="text-white font-bold mb-4">Síguenos</h3>
           <div class="flex gap-4">
             <a href="#" class="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors group">
               <svg class="w-5 h-5 group-hover:fill-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
             </a>
             <a href="#" class="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors group">
               <svg class="w-5 h-5 group-hover:fill-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
             </a>
           </div>
        </div>

        <div>
           <h3 class="text-white font-bold mb-4">Contacto</h3>
           <div class="text-sm space-y-2">
             <p>📍 Av. de la Música 123, Ciudad de México</p>
             <p>✉️ hola&#64;radiohub.com</p>
             <p>📞 +52 (55) 1234 5678</p>
           </div>
        </div>
      </div>
      
      <div class="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-xs">
        <p>© {{ currentYear }} Radio Hub. Todos los derechos reservados. Hecho con ❤️ por Antigravity.</p>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  protected readonly currentYear = new Date().getFullYear();
}
