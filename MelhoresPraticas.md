### 📝 Padrões de Commit (Conventional Commits)

Utilizamos o padrão de commits semânticos para garantir a organização e a legibilidade do histórico de evolução do projeto.

| Tipo | Prefixo | Descrição |
| :--- | :--- | :--- |
| **Funcionalidade** | `feat:` | Adição de uma nova funcionalidade ao sistema. |
| **Correção** | `fix:` | Correção de um erro (bug) que estava afetando o funcionamento. |
| **Documentação** | `docs:` | Alterações apenas na documentação (ex: README). |
| **Estilização** | `style:` | Ajustes de formatação, pontos e vírgulas ou estilo visual (não altera o código). |
| **Refatoração** | `refactor:` | Alteração de código que não corrige erro nem adiciona nova função. |
| **Performance** | `perf:` | Mudança de código focada em tornar a aplicação mais rápida. |
| **Testes** | `test:` | Adição ou correção de testes existentes. |
| **Construção** | `build:` | Alterações que afectam o sistema de build ou dependências externas. |

**Exemplo de uso:**
`git commit -m "fix(footer): corrige caminho do ficheiro CSS"`