> ### **Pasos antes de empezar a trabajar (sad).**

- **Actualizar rama de desarrollo:**

  - git switch develop
  - git fetch
  - git merge

- **Fusionar los cambios de la rama de desarrollo en tu rama local:**
  - git switch NombreRamaLocal
  - git merge develop

> ### **Pasos antes de hacer un push (sad).**

- **Rama local:**

  - <u>Commit de los cambios:</u>

    - git add .
    - git commit -m "commit info"

  - <u>Cambiar a la rama de desarrollo:</u>
    - git switch develop

- **Rama develop:**

  - <u>Actualizar la rama por si hay nuevos cambios en la rama remota:</u>

    - git fetch
    - git merge (solucionar conflictos en caso de que los haya)

  - <u>Fusionar los cambios de tu rama local en la rama de desarrollo para subirlos:</u>
    - git merge NombreRamaLocal
    - git push

> ### **Borrar una rama.**

- git branch -d nombreRama (desde fuera de la rama)

> ### **Copiar archivos de _Descargas_ al directorio _assets_ del proyecto local (sad).**

- mv ~/Descargas/* ~/Escritorio/PodProse/application/src/assets/

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

> ### **Simbología para commits (sad).**

| Commit type                | Emoji                            |
| :------------------------- | :------------------------------- |
| Initial commit             | 🎉 `:tada:`                      |
| Version tag                | 🔖 `:bookmark:`                  |
| **New feature**            | ✨ `:sparkles:`                  |
| **Bugfix**                 | 🐛 `:bug:`                       |
| Metadata                   | 📇 `:card_index:`                |
| Documentation              | 📚 `:books:`                     |
| Documenting source code    | 💡 `:bulb:`                      |
| Performance                | 🐎 `:racehorse:`                 |
| Cosmetic                   | 💄 `:lipstick:`                  |
| Tests                      | 🚨 `:rotating_light:`            |
| Adding a test              | ✅ `:white_check_mark:`          |
| Make a test pass           | ✔️ `:heavy_check_mark:`          |
| General update             | ⚡ `:zap:`                       |
| Improve format/structure   | 🎨 `:art:`                       |
| Refactor code              | 🔨 `:hammer:`                    |
| Removing code/files        | 🔥 `:fire:`                      |
| Continuous Integration     | 💚 `:green_heart:`               |
| Security                   | 🔒 `:lock:`                      |
| Upgrading dependencies     | ⬆️ `:arrow_up:`                  |
| Downgrading dependencies   | ⬇️ `:arrow_down:`                |
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
| **Configuration files**    | 🔧 `:wrench:`                    |
| Package.json in JS         | 📦 `:package:`                   |
| **Merging branches**       | 🔀 `:twisted_rightwards_arrows:` |
| Bad code / need improv.    | 💩 `:hankey:`                    |
| Reverting changes          | ⏪ `:rewind:`                    |
| Breaking changes           | 💥 `:boom:`                      |
| Code review changes        | 👌 `:ok_hand:`                   |
| Accessibility              | ♿ `:wheelchair:`                |
| Move/rename repository     | 🚚 `:truck:`                     |

> ### **Valores de opacidad en hexadecimal**

| Opacidad | Valor Hexadecimal |
| -------- | ----------------- |
| 100%     | FF                |
| 95%      | F2                |
| 90%      | E6                |
| 85%      | D9                |
| 80%      | CC                |
| 75%      | BF                |
| 70%      | B3                |
| 65%      | A6                |
| 60%      | 99                |
| 55%      | 8C                |
| 50%      | 80                |
| 45%      | 73                |
| 40%      | 66                |
| 35%      | 59                |
| 30%      | 4D                |
| 25%      | 40                |
| 20%      | 33                |
| 15%      | 26                |
| 10%      | 1A                |
| 5%       | 0D                |
| 0%       | 00                |
