import React from 'react';
import styled from 'styled-components';
import {PhotoList} from './PhotoList.js';


const BottomTopWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`

const BottomBottomWrapper = styled.div`
	display: flex;
	padding: 2%;
	justify-content: space-between;
	margin: auto;
`

function PhotoListToggle(props) {
	if (props.photoListShow) {		
		let start = 0;
		let end = 7	
		if (props.featureImgObj.index > 3) {
			start = props.featureImgObj.index-3;
			end = props.featureImgObj.index+4;
		}
		if (props.featureImgObj.index >= props.imagesArr.length-4) {
			start = props.imagesArr.length-7;
			end = props.imagesArr.length;
		}
			return (
				<div>
				<BottomTopWrapper>
					<span>{props.featureImgObj.index+1}/{props.imagesArr.length} {props.featureImgObj.caption}</span>
					<div onClick={props.togglePhotoList}> Hide photo list 
						<svg x="0px" y="0px" width="10px" height="10px" viewBox="0 0 292.362 292.362">
						<g>
							<path d="M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424   C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428   s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z" fill="#FFFFFF"/>
						</g>
						</svg> 
					</div>
				</BottomTopWrapper>
				<BottomBottomWrapper>
					<PhotoList imagesArr={props.imagesArr.slice(start, end)} changeFeatureImg={props.changeFeatureImg} featureImgObj={props.featureImgObj}/>
				</BottomBottomWrapper>
				</div>
				)
		} else {
			return (
				<div>
					<BottomTopWrapper>
						<span>{props.featureImgObj.index+1}/{props.imagesArr.length} {props.featureImgObj.caption}</span>
						<div onClick={props.togglePhotoList}> Show photo list 
							<svg x="0px" y="0px" width="10px" height="10px" viewBox="0 0 292.362 292.361">
								<path d="M286.935,197.287L159.028,69.381c-3.613-3.617-7.895-5.424-12.847-5.424s-9.233,1.807-12.85,5.424L5.424,197.287   C1.807,200.904,0,205.186,0,210.134s1.807,9.233,5.424,12.847c3.621,3.617,7.902,5.425,12.85,5.425h255.813   c4.949,0,9.233-1.808,12.848-5.425c3.613-3.613,5.427-7.898,5.427-12.847S290.548,200.904,286.935,197.287z" fill="#FFFFFF"/>
							</svg>
						</div>
					</BottomTopWrapper>
					<BottomBottomWrapper>
					</BottomBottomWrapper>
				</div>
				)
		}
}

export {PhotoListToggle};



