import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FaturamentoCadastroComponent } from "./faturamento-cadastro/faturamento-cadastro.component";
import { FaturamentoGridComponent } from "./faturamento-grid/faturamento-grid.component";

const routes: Routes = [
  { path: 'novoFaturamento', component: FaturamentoCadastroComponent },
  { path: 'pesquisaFaturamentos', component: FaturamentoGridComponent }
];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
export class FaturamentosRoutingModule { }