import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { useAllMdx } from '../../data'

const name = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

const abbreviation = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

const initial = ['m', 't', 'w', 't', 'f', 's', 's']

const createDayObject = (day, year) => {
  return {
    year: year,
    name: name[day],
    abbreviation: abbreviation[day],
    initial: initial[day],
    count: -1,
    percent: 0,
  }
}

export const SourceDays = ({ filter, children }) => {
  const defaultValues = name.map((_, index) => createDayObject(index, 0))

  const count = useAllMdx(filter)
    .reduce((items, item) => {
      let day = new Date(item.node.frontmatter.date).getDay()
      let year = new Date(item.node.frontmatter.date).getFullYear()
      items[year] = items[year] || [...defaultValues]
      items[year].push(createDayObject(day, year))

      return items
    }, [])
    .map(year => {
      let yearValue = year.reduce((a, b) =>
        b.year !== 0 ? (a = b.year) : null
      )

      return Object.values(
        year.reduce((items, item) => {
          const { name } = item
          items[name] = items[name] || {
            ...item,
            year: yearValue,
          }
          items[name].count += 1
          return items
        }, {})
      )
    })

  const days = Object.values(
    count.map(year => {
      let total = year.reduce((a, b) => ({ count: a.count + b.count }))
      return year.map(day => {
        return {
          ...day,
          percent: Math.round((day.count / total.count) * 100),
        }
      })
    })
  )

  return <Fragment>{children(days)}</Fragment>
}

SourceDays.propTypes = {
  /** A string used as a filter for the allMdx GraphQL query */
  filter: PropTypes.string,
  /** React children */
  children: PropTypes.func,
}
