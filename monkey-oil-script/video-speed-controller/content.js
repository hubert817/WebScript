// 视频播放速度控制器
(function() {
    'use strict';

    const CONFIG = {
        presetSpeeds: [0.5, 0.75, 1.0, 1.25, 1.5, 2.0, 3.0],
        controllerId: 'video-speed-controller'
    };

    let controller = null;
    let currentVideo = null;

    function findVideo() {
        return document.querySelector('video');
    }

    function createController() {
        if (controller) return;

        controller = document.createElement('div');
        controller.id = CONFIG.controllerId;
        controller.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px;
            border-radius: 5px;
            z-index: 9999;
        `;

        CONFIG.presetSpeeds.forEach(speed => {
            const btn = document.createElement('button');
            btn.textContent = speed + 'x';
            btn.style.margin = '2px';
            btn.onclick = () => {
                if (currentVideo) {
                    currentVideo.playbackRate = speed;
                }
            };
            controller.appendChild(btn);
        });

        document.body.appendChild(controller);
    }

    function mainLoop() {
        const video = findVideo();
        if (video !== currentVideo) {
            currentVideo = video;
            if (video) {
                createController();
            }
        }
    }

    setInterval(mainLoop, 3000);
    mainLoop();

    console.log('视频速度控制器已加载');
})();