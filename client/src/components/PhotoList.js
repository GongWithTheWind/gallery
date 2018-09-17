import React from 'react';
import styled from 'styled-components';


const StyledThumbnail = styled.div`
	display: inline-block;
	opacity: ${props => props.featured ? 1 : 0.6}

`

function Thumbnail(props) {
	return (
		<StyledThumbnail onClick={props.changeFeatureImg} featured={props.featured} >
			<img src={props.imageObj.image} height="67" width="100" index={props.imageObj.index} />
		</StyledThumbnail>)
}

const StyledPhotoList = styled.div`
	display: flex;
	width: 900px;
	flex-wrap: wrap;
	justify-content: space-evenly;
`

function PhotoList(props) {
	return (
			<StyledPhotoList >
				{props.imagesArr.map((ele)=>{
					return <Thumbnail imageObj={ele} changeFeatureImg={props.changeFeatureImg} featured={ele.index === props.featureImgObj.index}/>
				})}
			</StyledPhotoList>
		)
}


export {PhotoList};