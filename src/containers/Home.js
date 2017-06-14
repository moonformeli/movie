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
                {/* Start section */}
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
                        <div className="col-xs-6 col-md-4"> 
                            <div className="row">
                                <a href="#">
                                    <div className="col-xs-4 col-md-12"> <span className="glyphicon glyphicon-thumbs-up icons"> </span></div>
                                    <div className="col-xs-8 col-md-12 icontxt">
                                        <h4>Vote for favorite movies</h4>
                                        <p>좋아하는 영화들을 직접 평가해보세요. 평가는 개인 성향 분석의 자료로 활용됩니다.</p>
                                    </div>
                                </a> 
                            </div>                                         
                        </div>
                        <div className="col-xs-6 col-md-3"> 
                            <div className="row">
                                <a href="#">
                                    <div className="col-xs-4 col-md-12"><span className="glyphicon glyphicon-link icons"> </span></div>
                                    <div className="col-xs-8 col-md-12 icontxt">
                                        <h4>Matching system</h4>
                                        <p>매칭 시스템으로 분석된 추천 영화들을 즐겨보세요.</p>
                                    </div>
                                </a>    
                            </div> 
                        </div>
                        <div className="col-xs-6 col-md-2"> 
                            <div className="row">
                                <a href="#">
                                    <div className="col-xs-4 col-md-12"><span className="glyphicon glyphicon-user icons"> </span></div>
                                    <div className="col-xs-8 col-md-12 icontxt">
                                        <h4>By customers</h4>
                                        <p>관객들의 객관적인 평가에 의해 선별된 영화들입니다.</p>
                                    </div>
                                </a> 
                            </div>                 
                        </div>
                    </div>
                </div>{/* End section */}
                {/* Start footer */}
                <footer className="container-fluid">
                    <div>
                        Copyrightⓒ2017 by Moon. All Page content is property of Moon.
                    </div>
                </footer>
            </div>
        );
    }
};

export default Home;