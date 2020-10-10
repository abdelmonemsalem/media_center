import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

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
        <Form className="media-filter">
            <Row>
                <Col lg={4} md={4} sm={4}>
                    <Form.Group>
                        <Form.Control as="select" name="month" value={month} onChange={handleChangeFilter}>
                            {selectMonth}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col lg={4} md={4} sm={4}>
                    <Form.Group>
                        <Form.Control as="select" name="year" value={year} onChange={handleChangeFilter}>
                            {yearsRangeArr}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col lg={4} md={4} sm={4}>
                    <Form.Group>
                        <Form.Control as="select" name="type" value={type} onChange={handleChangeFilter}>
                            <option value="">All</option>
                            <option value="news">News</option>
                            <option value="event">Events</option>
                            <option value="rule">Rules</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )
}

export default Filters;