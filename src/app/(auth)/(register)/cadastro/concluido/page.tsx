import { Shell } from "@/components/shells/shell"
import { ButtonToGoHome } from "../_components/button-to-go-home"

export default function Page() {
  return (
    <Shell className="max-w-xl">
      <div className="font-medium text-base text-center max-w-xs w-auto m-auto">
        Cadastro concluído com sucesso, aguarde pela validação da sua conta.
        Entraremos em contato!
      </div>
      <ButtonToGoHome />
    </Shell>
  )
}
