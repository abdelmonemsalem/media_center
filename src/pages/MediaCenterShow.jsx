import React, { Component } from 'react'
import DaysSlider from '../Components/DaysSlider.jsx'
import MediaItem from '../Components/MediaItem'
import Filters from '../utils/Filters.jsx'
import Pager from '../utils/Pager'
import {GetData} from '../API/GetData'
import {paginate} from '../utils/Paginate'
import { store } from 'react-notifications-component'

class MediaCenterShow extends Component {
  constructor() {
    super()
    this.state = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate(),
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      type: "",
      yearsRange: [1950, 2050],
      data: [],
      filterdData: [],
      pageSize: 5,
      currentPage: 1
    }
  }

  HandleFilter(type, date) {
    const data = this.state.data.filter(m => (type === "" ? m.date === date : (m.date === date && m.type === type) ));
    this.setState({filterdData: data});
  }

  componentDidMount() {
    GetData()
    .then(response => {
      this.setState({
        data: response.data,
        filterdData: response.data
      });
    })
    .catch(err => {
      store.addNotification({
          title: "Error!",
          message: "Something is going wrong",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true
          }
      });
    });
  }

  handleSelectDay = event => {
    const {year, month, type} = this.state
    let day = event.currentTarget.dataset.val
    this.setState({
      day: day
    });
    this.HandleFilter(type, `${year}-${parseInt(month) + 1}-${day}`);
  }

  handleChangeFilter = event => {
    const {year, month, day, type} = this.state
    const {name, value} = event.target
    if (name === "type") {
      this.setState({
        type: value
      });
      this.HandleFilter(value, `${year}-${parseInt(month) + 1}-${day}`);
    } else if (name === "year") {
      this.setState({
        year: value
      });
      this.HandleFilter(type, `${value}-${parseInt(month) + 1}-${day}`);
    } else if (name === "month") {
      this.setState({
        month: event.target.value
      });
      this.HandleFilter(type, `${year}-${parseInt(value) + 1}-${day}`);
    }
    
  }

  handlePageChange = page => {
    this.setState({ currentPage: page })
  }

  render() {
    const {month, year, months, yearsRange, type, filterdData, pageSize, currentPage, day} = this.state;
    return (
        <main className="mediaCenter">
          
          <Filters month={month} year={year} months={months} type={type} yearsRange={yearsRange} handleChangeFilter={this.handleChangeFilter} />
          <DaysSlider month={month} year={year} months={months} day={day} handleSelectDay={this.handleSelectDay} />
          <MediaItem filterdData={paginate(filterdData, currentPage, pageSize)} />
          <div className="text-center">
            <Pager 
              itemsCount={filterdData.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </main>
    )
  }
}

export default MediaCenterShow