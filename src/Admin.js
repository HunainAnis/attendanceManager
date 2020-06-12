import React from 'react'
import * as firebase from 'firebase'
import { MDBContainer, MDBBtn, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact'



class Admin extends React.Component {
    
    state = {
        todayclass:[],
        marketing:false,
        forensic:false,
        medchem:false,
        pharmatech:false,
        days:null
    }
    
    componentDidMount() {
        const db = firebase.database().ref().child('days')
        db.on('value', data=>{
            this.setState({days:data.val()})
        })
    }

    submitClasses() {
        const NewArray = Object.keys(this.state).filter(i=>this.state[i]===true)
        console.log(NewArray)
        const db = firebase.database().ref().child('classes')
        db.set(NewArray)
        .then(console.log('new classes'))
    }
    handleChange(e) {
        const { name } = e.target
        this.setState(state=>({
            [name]:!state[name]
        }))
    }
    arrangeData(data) {
        const { days } = this.state
        let arranged = {}
        Object.keys(days).map(date=>{
            Object.keys(days[date].students).map(student=>{
               arranged = {
                    'name': days[date].students[student].name.toString(),
                    'rollno': days[date].students[student].enrollment.toString(),
                    'classes':  days[date].students[student].classes.toString(),
                    'date':  date.toString(),
                }
                return data.rows.push(arranged)
            }
            )
            // console.log(arranged)
        })
    }
    
    render() {
        console.log(this.state.days)
        const data = {
            columns: [
                {
                    label: 'Name',
                field: 'name',
                sort: 'asc'
            },
            {
                label: 'Roll #',
                field: 'rollno',
                sort: 'asc'
            },
            {
                label: 'Class(es)',
                field: 'classes',
                sort: 'asc'
            },
            {
                label: 'Date',
                field: 'date',
                sort: 'asc'
            }
        ],
        rows: []
    }
    this.state.days !== null && this.arrangeData(data)
        return(
            <MDBContainer>
            <div>
                <h2>Today's classes</h2>
                <ol>
                    {this.props.classes === null
                    ?<h3>No classes available for today</h3>
                    :this.props.classes.map(i=>(
                        <li key={i}>{i}</li>
                    ))
                }
                </ol>
            </div>
            <div>
                <h2>Fill todays class checkbox!</h2>
            </div>
            <div className="custom-control custom-checkbox">
              <input onChange={(e)=>this.handleChange(e)} type="checkbox" className="custom-control-input" id="medchem" name='medchem' checked={this.state.medchem} />
              <label className="custom-control-label" htmlFor="medchem">Medicinal Chemistry</label>
            </div>
            <div className="custom-control custom-checkbox">
              <input onChange={(e)=>this.handleChange(e)} type="checkbox" className="custom-control-input" id="marketing" name='marketing' checked={this.state.marketing} />
              <label className="custom-control-label" htmlFor="marketing">Pharmaceutical Marketing</label>
            </div>
            <div className="custom-control custom-checkbox">
              <input onChange={(e)=>this.handleChange(e)} type="checkbox" className="custom-control-input" id="forensic" name='forensic' checked={this.state.forensic} />
              <label className="custom-control-label" htmlFor="forensic">Forensic Pharmacy</label>
            </div>
            <div className="custom-control custom-checkbox">
              <input onChange={(e)=>this.handleChange(e)} type="checkbox" className="custom-control-input" id="pharmatech" name='pharmatech' checked={this.state.pharmatech} />
              <label className="custom-control-label" htmlFor="pharmatech">Pharmaceutical Technology</label>
            </div>
            <MDBBtn onClick={()=>this.submitClasses()}>Submit</MDBBtn>
            <MDBRow>
                <MDBCol>
                    <MDBTable responsive>
                        <MDBTableHead columns={data.columns} />
                        <MDBTableBody rows={data.rows} />
                    </MDBTable>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
        )
    }
}

export default Admin