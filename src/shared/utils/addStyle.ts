import { Theme } from '../../customizations/interfaces/theme.interface'

const STYLE_STRING = (theme: Theme) => `
.bg-primary {
  background-color: ${theme.primary[0]};
}

.text-primary {
  color: ${theme.primary[0]};
}

.search-input::placeholder {
  color: ${theme.primary[0]};
}

.fill-primary {
  fill: ${theme.primary[0]} !important;
}

.border-primary {
  border-color: ${theme.primary[0]};
}

.bg-menu {
  background-color: ${theme.menu[0]};
}

.bg-menu-dark {
  background-color: ${theme.menuDark[0]};
}

.bg-menu-dark {
  background-color: ${theme.menuDark[0]};
}

.bg-menu-item:hover {
  background-color: ${theme.menu[0]};
  filter: brightness(85%);
}
`

export function addStyle(theme: Theme) {
  const styleString = STYLE_STRING(theme)
  let style = document.getElementById('theme-style')
  if (!style) {
    style = document.createElement('style')
    style.id = 'theme-style'
    document.head.append(style)
  }

  style.textContent = styleString

  const root = document.documentElement
  root.style.setProperty('--primary', theme.primary[0])
  root.style.setProperty('--menu', theme.menu[0])
}
