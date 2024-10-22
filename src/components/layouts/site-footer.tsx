import { Icons } from "@/components/icons"
import { Shell } from "@/components/shells/shell"

export function SiteFooter() {
  return (
    <footer className="w-full bg-background h-80 ">
      <Shell>
        <section
          id="footer-content"
          aria-labelledby="footer-content-heading"
          className="flex flex-col gap-10 mt-20"
        >
          <div className="container flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Icons.logo className="text-[#DCDCDC] w-32" />
            </div>
            <div className="flex flex-col md:flex-row md:space-x-12">
              <div className="mb-6 md:mb-0">
                <h2 className="text-lg font-semibold mb-2 h-8">Páginas</h2>
                <ul className="space-y-2 text-base">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                      Categorias
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                      Favoritos
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mb-6 md:mb-0">
                <h2 className="text-lg font-semibold mb-2 h-8"></h2>
                <ul className="space-y-2 text-base">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                      Minhas negociações
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                      Meus Produtos
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                      Minha Loja
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mb-6 md:mb-0">
                <h2 className="text-lg font-semibold mb-2 h-8">Outros</h2>
                <ul className="space-y-2 text-base">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                      Contato
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                      Sobre
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section
          id="footer-bottom"
          aria-labelledby="footer-bottom-heading"
          className="flex items-center justify-between text-sm text-gray-600 mt-20"
        >
          <p>Proposta de Compra© Todos os direitos reservados</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-900">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-900">
              Terms of Service
            </a>
          </div>
        </section>
      </Shell>
    </footer>
  )
}
