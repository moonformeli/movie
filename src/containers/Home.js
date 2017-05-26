import React from 'react';
import {store} from '../index';
import {removeMovies_API} from '../actions';
import BigText from '../components/BigText';

import carousel_img1 from '../../public/images/carousel_img1.jpg';
import carousel_img2 from '../../public/images/carousel_img2.jpg';
import carousel_img3 from '../../public/images/carousel_img3.jpg';
import left from '../../public/images/left.png';
import right from '../../public/images/right.png';

import '../../public/styles/Home.css';

class Home extends React.Component {
    
    componentDidMount() {
        store.dispatch(removeMovies_API());
    }
    
    render() {
        return (
            <div>
                <div id="carousel-generic" className="carousel slide">
                    <ol className="carousel-indicators">
                        <li data-target="#carousel-generic" data-slide-to="0" className="active"></li>
                        <li data-target="#carousel-generic" data-slide-to="1"></li>
                        <li data-target="#carousel-generic" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner" role="listbox">
                        <div className="item active">
                            <img src={carousel_img1} alt="First slide"/>
                        </div>
                        <div className="item">
                            <img src={carousel_img2} alt="Second slide"/>
                        </div>
                        <div className="item">
                            <img src={carousel_img3} alt="Third slide"/>
                        </div>
                    </div>
                    <a className="left carousel-control left-area" href="#carousel-generic" role="button" data-slide="prev">
                        <img src={left} className="control" />
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="right carousel-control right-area" href="#carousel-generic" role="button" data-slide="next">
                        <img src={right} className="control" />
                        <span className="sr-only">Next</span>
                    </a>
                </div> {/* End Carousel */}
                <div className="container">
                    <div className="row service">
                        <div className="col-xs-6 col-md-3">  
                            <div className="row">
                                <a href="#">
                                    <div className="col-xs-4 col-md-12"> <span className="glyphicon glyphicon-film icons"> </span></div>
                                    <div className="col-xs-8 col-md-12 icontxt">
                                        <h4>A variety of movies</h4>
                                        <p>다양한 영화들을 둘러볼 수 있습니다.</p>
                                    </div>
                                </a>
                            </div>                 
                        </div>         
                        <div className="col-xs-6 col-md-3"> 
                            <div className="row">
                                <a href="#">
                                    <div className="col-xs-4 col-md-12"> <span className="glyphicon glyphicon-phone icons"> </span></div>
                                    <div className="col-xs-8 col-md-12 icontxt">
                                        <h4>Fully responsive</h4>
                                        <p>9pixelstudio에서 만드는 웹 사이트는 반응형 웹 사이트를 기본으로 작업합니다.</p>
                                    </div>
                                </a> 
                            </div>                                         
                        </div>
                        <div className="col-xs-6 col-md-3"> 
                            <div className="row">
                                <a href="#">
                                    <div className="col-xs-4 col-md-12"><span className="glyphicon glyphicon-refresh icons"> </span></div>
                                    <div className="col-xs-8 col-md-12 icontxt">
                                        <h4>Very flexible</h4>
                                        <p>HTML5와 CSS3 기반으로 제작된 웹 페이지는 수정과 유지 보수가 빠르고 간편합니다.</p>
                                    </div>
                                </a>    
                            </div> 
                        </div>
                        <div className="col-xs-6 col-md-3"> 
                            <div className="row">
                                <a href="#">
                                    <div className="col-xs-4 col-md-12"><span className="glyphicon glyphicon-user icons"> </span></div>
                                    <div className="col-xs-8 col-md-12 icontxt">
                                        <h4>For customer</h4>
                                        <p>고객의 요구에 따른 최상의 결과물을 제공해 드립니다.</p>
                                    </div>
                                </a> 
                            </div>                 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Home;