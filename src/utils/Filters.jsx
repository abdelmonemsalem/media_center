import React from 'react'

function Filters(props) {    
    const {year, month, months, type, yearsRange, handleChangeFilter} = props;

    let yearsRangeArr = []

    for (let i = yearsRange[0]; i <= yearsRange[1]; i++) {
        yearsRangeArr.push(<option key={i} value={i}>{i}</option>)
    }

    const selectMonth = months.map((month, index) => {
      return <option key={index} value={index}>{month}</option>
    });

    return (
        <div className="mediaCenter-filter">
            <select name="month" value={month} onChange={handleChangeFilter}>
                {selectMonth}
            </select>
            <select name="year" value={year} onChange={handleChangeFilter}>
                {yearsRangeArr}
            </select>
            <select name="type" value={type} onChange={handleChangeFilter}>
                <option value="">All</option>
                <option value="news">News</option>
                <option value="event">Events</option>
                <option value="rule">Rules</option>
            </select>
        </div>
    )
}

export default Filters;