> ### Copiar archivos de _Descargas_ al directorio _assets_ del proyecto local (sad).

- Hay que poner el nombre del archivo sin extensión (a no ser que haya más de 1 archivo con diferente extensión, en ese caso, te copiará los 2).
- mv ~/Descargas/_ ~/Escritorio/PodProse/application/src/assets/

> ### Pasos antes de empezar a trabajar (sad).

- git switch develop
- git fetch
- git merge

- git switch NombreRamaLocal
- git merge develop

> ### Pasos antes de hacer un push (sad).

- Rama local:
  - git add .
  - git commit -m "commit info"
  - git switch develop
- Rama develop:
  - git fetch
  - git merge (solucionar conflictos en caso de que los haya)
  - git merge NombreRamaLocal
  - git push

> ### Simbología para commits (sad).

| Commit type                | Emoji                            |
| :------------------------- | :------------------------------- |
| Initial commit             | 🎉 `:tada:`                      |
| Version tag                | 🔖 `:bookmark:`                  |
| New feature                | ✨ `:sparkles:`                  |
| **Bugfix**                 | 🐛 `:bug:`                       |
| Metadata                   | 📇 `:card_index:`                |
| Documentation              | 📚 `:books:`                     |
| Documenting source code    | 💡 `:bulb:`                      |
| Performance                | 🐎 `:racehorse:`                 |
| Cosmetic                   | 💄 `:lipstick:`                  |
| Tests                      | 🚨 `:rotating_light:`            |
| Adding a test              | ✅ `:white_check_mark:`          |
| Make a test pass           | ✔️  `:heavy_check_mark:`          |
| General update             | ⚡  `:zap:`                       |
| Improve format/structure   | 🎨 `:art:`                       |
| Refactor code              | 🔨 `:hammer:`                    |
| Removing code/files        | 🔥 `:fire:`                      |
| Continuous Integration     | 💚 `:green_heart:`               |
| Security                   | 🔒 `:lock:`                      |
| Upgrading dependencies     | ⬆️  `:arrow_up:`                  |
| Downgrading dependencies   | ⬇️  `:arrow_down:`                |
| Lint                       | 👕 `:shirt:`                     |
| Translation                | 👽 `:alien:`                     |
| Text                       | 📝 `:pencil:`                    |
| Critical hotfix            | 🚑 `:ambulance:`                 |
| Deploying stuff            | 🚀 `:rocket:`                    |
| Fixing on MacOS            | 🍎 `:apple:`                     |
| Fixing on Linux            | 🐧 `:penguin:`                   |
| Fixing on Windows          | 🏁 `:checkered_flag:`            |
| **Work in progress**       | 🚧 `:construction:`              |
| Adding CI build system     | 👷 `:construction_worker:`       |
| Analytics or tracking code | 📈 `:chart_with_upwards_trend:`  |
| Removing a dependency      | ➖ `:heavy_minus_sign:`          |
| Adding a dependency        | ➕ `:heavy_plus_sign:`           |
| Docker                     | 🐳 `:whale:`                     |
| Configuration files        | 🔧 `:wrench:`                    |
| Package.json in JS         | 📦 `:package:`                   |
| Merging branches           | 🔀 `:twisted_rightwards_arrows:` |
| Bad code / need improv.    | 💩 `:hankey:`                    |
| Reverting changes          | ⏪ `:rewind:`                    |
| Breaking changes           | 💥 `:boom:`                      |
| Code review changes        | 👌 `:ok_hand:`                   |
| Accessibility              | ♿  `:wheelchair:`                |
| Move/rename repository     | 🚚 `:truck:`                     |
