---
title: 基于react的audio组件
categories: front-end
tags:
  - react
abbrlink: de6d4618
date: 2018-11-06 14:02:41
---

> 知识点：
> 子组件给父组件传值：
> 参考：[http://taobaofed.org/blog/2016/11/17/react-components-communication/](http://taobaofed.org/blog/2016/11/17/react-components-communication/)

父组件
```jsx
/**
 * 基于react的audio组件
 * @param {Array} courseWareList 课件列表
 * @buttonResponse {function} 回调audio组件，控制每个audio的属性
 * @author frank
 * @description  
 */
import React from 'react';
import Audio from './audio';

class orderRecordCourseDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseWareList: []
        }
    }

    //回调audio组件的值
    buttonResponse(list, id, flag) {
        console.log(list, id, flag)
        list[id].isPlay = flag;
        console.log(67, "list值", list[id]);
        const that = this;
        that.setState({ courseWareList: list });
    }
    render() {
        const that = this;
        return (
            <div className='course-information-page'>
                <ul className='resources'  >
                    {
                        this.state.courseWareList.map(function (obj, i) {
                            obj.fileType = Util.checkFileType(obj.courseCoursewareName, obj.courseCoursewareType)
                            return (
                                <li>
                                    <Audio closeAllAudio={(courseWareList, id, flag) => this.buttonResponse(courseWareList, id, flag)}
                                        src={obj.courseCoursewareUrl} id={i} courseCoursewareName={obj.courseCoursewareName}
                                        courseWareList={that.state.courseWareList} isPlay={obj.isPlay} />
                                </li>
                            )
                        }, this)
                    }
                </ul>
            </div>

        )
    }
}


export default orderRecordCourseDetail
```
子组件 audio.jsx
```jsx
import React from 'react'
import './audio.scss';

class audio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMuted: false,
            volume: 100,
            allTime: 0,
            currentTime: 0
        }
    }
    componentWillMount() {
    }
    // 暂停函数
    pauseAll() {
        let audios = document.getElementsByTagName("audio");
        var self = this;
        [].forEach.call(audios, function (i) {
            // 将audios中其他的audio全部暂停
            i !== self && i.pause();
        })
    }
    controlAudio(type, value) {
        console.log("controlAudio---type", type);
        const { id, src } = this.props;
        let that = this;
        const audio = document.getElementById(`audio${id}`);
        let courseWareList = this.props.courseWareList;
        let audios = document.getElementsByTagName("audio"); // 获取所有audios
        // 给play事件绑定暂停函数
        [].forEach.call(audios, function (i) {
            i.addEventListener("play", that.pauseAll.bind(i));
        })
        switch (type) {
            case 'allTime':
                this.setState({
                    allTime: audio.duration
                })
                break
            case 'play':
                // 解决音频文件暂停和播放操作间隔时间问题；
                let isPlaying = audio.currentTime > 0 && !audio.paused && !audio.ended && audio.readyState > 2;
                if (!isPlaying) {
                    setTimeout(function () {
                        audio.play().
                            catch(function (e) {
                                console.log("", e.message);
                                console.log("", e.description);
                            });
                    }, 150);
                } else {
                    alert("网络缓慢，正在加载音频...");
                }
                courseWareList.map(function (item, index) {
                    if (that.props.id == index) {
                        courseWareList[index].isPlay = true;
                    } else {
                        courseWareList[index].isPlay = false;
                    }
                })
                console.log("courseWareList.map", courseWareList)
                that.props.closeAllAudio(courseWareList, this.props.id, true);
                audio.play();
                break
            case 'pause':
                audio.pause();
                // this.setState({
                //     isPlay: false
                // })
                courseWareList.map(function (item, index) {
                    courseWareList[index].isPlay = false;
                })
                console.log("courseWareList.map", courseWareList)
                that.props.closeAllAudio(courseWareList, this.props.id, false);
                break
            case 'muted':
                this.setState({
                    isMuted: !audio.muted
                })
                audio.muted = !audio.muted
                break
            case 'changeCurrentTime':
                let range = document.getElementById(`range${id}`);
                this.setState({
                    currentTime: range.value
                });
                console.log(range.value);
                if (range.value) {
                    audio.currentTime = range.value
                }

                if (value == audio.duration) {
                    this.setState({
                        isPlay: false
                    })
                }
                break
            case 'getCurrentTime':
                this.setState({
                    currentTime: audio.currentTime
                })

                if (audio.currentTime == audio.duration) {
                    courseWareList.map(function (item, index) {
                        courseWareList[index].isPlay = false;
                    })
                }
                break
            case 'changeVolume':
                audio.volume = value / 100
                this.setState({
                    volume: value,
                    isMuted: !value
                })
                break
        }
    }
    millisecondToDate(time) {
        const second = Math.floor(time % 60)
        let minite = Math.floor(time / 60)
        // let hour
        // if(minite > 60) {
        //   hour = minite / 60
        //   minite = minite % 60
        //   return `${Math.floor(hour)}:${Math.floor(minite)}:${Math.floor(second)}`
        // }
        return `${minite}:${second >= 10 ? second : `0${second}`}`
    }

    render() {
        const id = this.props.id;
        const src = this.props.src;
        let isPlay = this.props.isPlay;
        const courseCoursewareName = this.props.courseCoursewareName;
        let currentTime = this.state.currentTime;
        let allTime = this.state.allTime;
        return (
            <div>
                <div className="audioBox ">
                    <audio id={`audio${id}`} src={src} preload={true}
                        onCanPlay={() => this.controlAudio('allTime')}
                        onTimeUpdate={(e) => this.controlAudio('getCurrentTime')}
                    >
                        您的浏览器不支持 audio 标签。
                    </audio>

                    <div className='left file'>{courseCoursewareName}</div>
                    <div
                        className={isPlay ? 'pause' : 'play'}
                        onClick={() => this.controlAudio(isPlay ? 'pause' : 'play')}>
                        <i></i>
                    </div>
                    <div className='progress'>
                        <div className='progress-container'>
                            <input id={`range${id}`}
                                type="range"
                                className="time"
                                step="0.01"
                                max={allTime}
                                value={currentTime}
                                onChange={(value) => this.controlAudio('changeCurrentTime', id)}
                                onClick={(value) => this.controlAudio('changeCurrentTime', id)}
                            />
                            <progress value={currentTime / allTime} className=" " ></progress>
                        </div>
                        <span className="current">
                            {this.millisecondToDate(allTime)}
                        </span>
                    </div>



                </div>
            </div>

        )
    }
}

export default audio
```