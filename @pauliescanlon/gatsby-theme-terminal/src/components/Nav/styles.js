import * as theme from '../../gatsby-plugin-theme-ui'

export const nav = {
  height: '100%',
  p: [4, 5, 5, 5],
}

export const ul = {
  ...theme.default.styles.ul,
  listStyle: 'none',
  p: 0,
}

export const li = {
  ...theme.default.styles.li,
  '.active-link': {
    textDecoration: 'none',
    color: 'text',
    cursor: 'default',
    ':focus': {
      boxShadow: 'none',
    },
  },
}

export const link = {
  ...theme.default.styles.a,
}