import React from 'react';
import path from 'path';
import fetch from 'node-fetch';
import {Modal} from './Modal.js';
import styled from 'styled-components';

const StyledImage = styled.div`
	width: 100%;
	max-height: 552px;
	margin: auto;
	vertical-align: middle;
	overflow: hidden;
`
const StyledModel = styled.div`
	width: 100vw;
	height: 100vw;
`

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			homeId: '9999999', //DEFAULTS TO HOME 100
			imagesArr: [{image: null, caption: null, index: null}],
			modalDisplay: false,
			featureImgObj: {image: null, caption: null, index: null},
			photoListArr: [],
			photoListShow: true
		}

		this.getPics = this.getPics.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.togglePhotoList = this.togglePhotoList.bind(this);
		this.changeFeatureImg = this.changeFeatureImg.bind(this);
		this.prevFeatureImg = this.prevFeatureImg.bind(this);
		this.nextFeatureImg = this.nextFeatureImg.bind(this);
		this.keyHandler = this.keyHandler.bind(this);

	}

	getHomeId () {
		this.setState({homeId: this.props.homeId}, ()=> {
			this.getPics();
		});
	}
			// let url = path.join('homes', this.state.homeId, 'images');

	getPics() {
		let url = '/homes/' + this.state.homeId + '/images';
		fetch(url)
		.then((res)=>{return res.json()})
		.then((data)=>{
			data = data.map((obj, index) => {
				obj.index = index;
				return obj
			})
			this.setState({
				imagesArr: data,
				featureImgObj: data[0]
			})
		})
		.catch( (err)=> console.log(err) )
	}

	toggleModal() {
		this.setState({modalDisplay: !this.state.modalDisplay});
	}

	keyHandler(event) {
		if (event.key === 'ArrowRight') {
			this.nextFeatureImg();
		}
		if (event.key === 'ArrowLeft') {
			this.prevFeatureImg();
		}
	}

	componentDidMount() {
		this.getHomeId();
		this.getPics();
	}

	changeFeatureImg(event) {
		let index = event.target.getAttribute("index")
		this.setState((prevState, props)=>{
			return {
				featureImgObj: prevState.imagesArr[index]}
		})
	}

	nextFeatureImg(event) {
		if (this.state.featureImgObj.index < this.state.imagesArr.length-1) {
			this.setState((prevState, props)=>{
				return {
					featureImgObj: prevState.imagesArr[prevState.featureImgObj.index+1]}
			})
		}
	}

	prevFeatureImg(event) {
		if (this.state.featureImgObj.index > 0) {
			this.setState((prevState, props)=>{
				return {
					featureImgObj: prevState.imagesArr[prevState.featureImgObj.index-1]}
			})
		}
	}

	togglePhotoList() {
		this.setState((prevState, props) => {
			return {photoListShow: !prevState.photoListShow}
		})
	}

	render() {
		return (
			<div>
					<StyledImage>
						<img src={this.state.imagesArr[0].image} onClick={this.toggleModal} width="100%"/>
					</StyledImage>
				<div className="modal" onKeyDown={this.keyHandler} tabIndex="0">
					<Modal imagesArr={this.state.imagesArr} keyHandler={this.keyHandler} modalDisplayState={this.state.modalDisplay} state={this.state} changeFeatureImg={this.changeFeatureImg} togglePhotoList={this.togglePhotoList} nextFeatureImg={this.nextFeatureImg} prevFeatureImg={this.prevFeatureImg} toggleModal={this.toggleModal}/>
			  </div>
			</div>
		)
	}
}

export default App
