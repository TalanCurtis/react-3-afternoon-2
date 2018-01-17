import React, { Component } from 'react';

//import axios
import axios from 'axios'

class NewUser extends Component{
    constructor(){
        super()
        this.state={
            name: '',
            img: '',
            desc: ''
        }
    }
    
    // insert addUser
    // addUser(){
    //     axios.post(`/api/users`, this.state)
    //     .then((res)=>{
    //         console.log(res);
    //         let user = res.data;
    //         this.props.history.push(`/user/${user.id}`)
    //     })
    // }
    addUser(){
        axios.post('/api/users', this.state).then(response=>{
            console.log(response)
            let user = response.data
            this.props.history.push(`/user/${user.id}`)
        })
    }

    updateUser(){
        let id = this.props.match.params.id        
        axios.put(`/api/user/${id}`, this.state).then(response=>{
            console.log(response)
            let user = response.data
            this.props.history.push(`/user/${user.id}`)
        })
    }

    deleteUser(){
        let id = this.props.match.params.id
        axios.delete(`api/user/${id}`).then(response=>{
            this.props.history.push(`/search`)
        })
    }

    // updateUser(){
    //     let id = this.props.match.params.id 
    //     axios.put(`/api/users/${id}`, this.state)
    //     .then((res)=>{
    //         console.log(res)
    //         let user = res.data;
    //         this.props.history.push(`/user/${id}`)
    //     })
    // }

    // insert updateUser   
    // updateUser(){
    //     // let body = {
    //     //     name: this.state.name,
    //     //     img: this.state.img,
    //     //     desc: this.state.desc
    //     // }
    //     let id = this.props.match.params.id 
    //     axios.put(`/api/users/${id}`, this.state)
    //     .then((res)=>{
    //         let user = res.data
    //         this.props.history.push(`/user/${user.id}`)
    //         // this.setState({
    //         //     name: res.data.name,
    //         //     img: res.data.img,
    //         //     desc: res.data.desc
    //         // })
    //     })
    // }
    // updateUser(){
    //     let id = this.props.match.params.id        
    //     axios.put(`/api/user/${id}`, this.state).then(response=>{
    //         console.log(response)
    //         let user = response.data
    //         this.props.history.push(`/user/${id}`)
    //     })
    // }


    // insert deleteUser
    // deleteUser(){
    //     let id =this.props.match.params.id
    //     axios.delete(`api/user/${id}`)
    //     .then((res)=>{
    //         this.props.history.push('/')
    //     })
    // }

    render(){
        return(
            <div className="content">
                {this.state.warn?<h4 style={{color: 'red'}}>You must include at least a name.</h4>:null}
                <form className='new-user' onSubmit={e=>this.submit(e)}>
                    <div className="pic-input input-group">
                        {
                            this.state.img
                            ?
                            <img src={this.state.img} alt="profile pic"/> 
                            :
                            <div className="pic-placeholder">No Image Yet</div>
                        }
                        <span>
                            <label>Image URL</label>
                            <input type='text' name='img' value={this.state.img} onChange={e=>this.handleChange(e)} />
                        </span>
                    </div>
                    <div className="input-group in-group">
                        <label>Name</label>
                        <input type='text' name='name' value={this.state.name} onChange={e=>this.handleChange(e)} />
                    </div>
                    <div className="input-group in-group">
                        <label>Description</label>
                        <textarea name='desc' value={this.state.desc} onChange={e=>this.handleChange(e)} />
                    </div>
                    {
                        this.state.id >= 0
                        ?
                        <span>
                            <button className='delete-button'>Delete User</button>
                            <button type='submit'>Update</button>
                        </span>
                        :
                        <button type='submit'>Save</button>
                    }
                </form>
            </div>
        )
    }

    componentDidMount(){
        let id = this.props.match.params.id
        if(id >= 0){
             axios.get(`/api/user/${id}`).then(response=>{
                 this.setState({
                     id: id,
                     name: response.data.name,
                     img: response.data.img,
                     desc: response.data.desc
                 })
             })
        }
    }

    componentWillReceiveProps(newProps){
        if (newProps.match.params.hasOwnProperty('id')){
            let id = newProps.match.params.id    
            axios.get(`/api/user/${id}`).then(response=>{
                this.setState({
                    id: id,
                    name: response.data.name,
                    img: response.data.img,
                    desc: response.data.desc
                })
            })
        } else {
            this.setState({
                id: null,
                name: '',
                img: '',
                desc: ''
            })
        }
    }

    submit(e){
        e.preventDefault();
        if (this.state.name){
            if (this.props.match.params.hasOwnProperty('id')){
                this.updateUser()
            } else {
                this.addUser()
            }
        } else {
            this.setState({warn: true})
            setTimeout(()=> {
                this.setState({warn: false})
            }, 2000);
        }
    }
    handleChange(e){
        let { value, name } = e.target
        this.setState(_=>{
            let newState={}
            newState[name]=value
            return newState
        })
    }
}

export default NewUser