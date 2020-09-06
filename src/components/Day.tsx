import React, { FunctionComponent, useEffect, useState } from 'react'

import './Day.styl'

const Day: FunctionComponent = () => {
  const [value, setValue] = useState<number | ''>('')
  const [data, setData] = useState<string | null>(null)
  useEffect(() => {
    if (!value) {
      setData(null)
      return
    }
    let aborted = false
    fetch(`https://day.ebichu.cc/api/${value}`, { mode: 'cors' })
      .catch((err) => {
        if (!aborted) {
          setData(err.toString())
        }
        throw err
      })
      .then((res) => res.json())
      .then((res) => {
        if (!aborted) {
          setData(JSON.stringify(res, null, 2))
        }
      })
    return () => { aborted = true }
  }, [value])
  return (
    <div>
      <label className="date-input">
        <span>输入日期：</span>
        <input
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          placeholder="1 - 365"
          type="number"
        />
      </label>
      <pre>{data}</pre>
    </div>
  )
}

export default Day
