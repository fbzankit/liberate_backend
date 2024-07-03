import React, { useContext,useReducer } from 'react';
import Select from 'react-select';
import GlobalContext from '../../../../Global/GlobalContext';
import Context from '../../Context/Context';
import { APIService } from '../../../../ApiServices/Apis/APIServices';
import $ from 'jquery';

const HomeFilterModal = () => {
    const [globalState,globalDispatch] = useContext(GlobalContext)
    const [state,dispatch] = useContext(Context)
    const options = []
    globalState.categories.map((lang)=>
        options.push({value:lang.id,label:lang.name})
    )
    const categoryChange=(obj)=>{
        let categoryArray=[];
        if(obj?.length>0){
            obj.map((res)=>
            categoryArray.push(res.value)
            )
        }
        dispatch({type: 'category',payload: {Type: 'category',category:categoryArray}})
    }
    const handleChange=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        dispatch({type: name,payload: {Type:name,[name]:value}})
    }
   const handleFilterSubmit=(e)=>{
       e.preventDefault();
       let data={
        category:state.category.toString(),
        gender:state.gender
    }
        APIService.getAllPractitioner(data).then((res)=>{  
            if(res.data.status==200){
                $('.modal').modal('hide');
                dispatch({type:'practitioner',payload:{Type:'practitioner',error:false,practitioner:res.data.data,userCategories:res.data.data?.userCategories.split(',')}});
            }
        }).catch((error)=>{
            dispatch({type:'error',payload:{Type:'error',error:true}});

        })
    }
    return (
        <>
            <div className="modal right fade modal-sidebar filter-modal" id="filter-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-heading">Filters</h2>
                            <button type="button" className="close" data-dismiss="modal"><i className="lb lb-cancel-icon"></i></button>
                        </div>                        
                        <div className="modal-body">
                        <form onSubmit={handleFilterSubmit}>
                            <div className="sidebar-filter-box bdr-btm">
                                <div className="up-gray-heading">
                                    <strong>Categories </strong>
                                </div>
                                <div className="filter-categories-list">
                                <Select
                                                        // defaultValue={state.category}
                                                        closeMenuOnSelect={false}
                                                        isMulti
                                                        options={options}
                                                        onChange={categoryChange}
                                                    />
                                </div>
                            </div>
                            {/* <div className="sidebar-filter-box bdr-btm">
                                <div className="up-gray-heading">
                                    <strong>Filter by age </strong>
                                </div>
                                <div className="filter-by-age">
                                    <div id="slider-range"></div>
                                    <div className="slider-labels">
                                        <div className="float-left caption">
                                            <strong>Min:</strong> <span id="slider-range-value1"></span>
                                        </div>
                                        <div className="float-right text-right caption">
                                            <strong>Max:</strong> <span id="slider-range-value2"></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <form>
                                                <input type="hidden" name="min-value" value="" />
                                                <input type="hidden" name="max-value" value="" />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="sidebar-filter-box bdr-btm">
                                <div className="up-gray-heading">
                                    <strong>Filter by gender </strong>
                                </div>
                                <ul className="filter-by-gender">
                                    <li>
                                        <label className="radiobox">Male
                                            <input type="radio" onChange={handleChange} checked={state?.gender=="m"?true:false} value="m" name="gender" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </li>
                                    <li>
                                        <label className="radiobox">Female
                                            <input type="radio" onChange={handleChange}  checked={state?.gender=="f"?true:false} value="f" name="gender" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </li>
                                    <li>
                                        <label className="radiobox">Non Binary
                                            <input type="radio" onChange={handleChange}  checked={state?.gender=="nb"?true:false} value="nb" name="gender" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                            {/* <div className="sidebar-filter-box bdr-btm">
                                <div className="up-gray-heading">
                                    <strong>Price</strong>
                                </div>
                                <div className="filter-by-price">
                                    <div id="slider-range2"></div>
                                    <div className="slider-labels">
                                        <div className="float-left caption">
                                            <strong>Min:</strong> <span id="slider-range-value3"></span>
                                        </div>
                                        <div className="float-right text-right caption">
                                            <strong>Max:</strong> <span id="slider-range-value4"></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <form>
                                                <input type="hidden" name="min-value" value="" />
                                                <input type="hidden" name="max-value" value="" />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="sidebar-filter-box">
                                <div className="pay-now-btn">
                                    <div className="text-center">
                                        <button type="submit" className="btn default-btn">Apply Filters</button>
                                    </div>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default HomeFilterModal;
