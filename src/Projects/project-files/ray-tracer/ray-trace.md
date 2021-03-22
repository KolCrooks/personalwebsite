## Introduction

Recently there has been a big push for ray tracing capable GPUs with video games. Nvidia and now AMD have but a lot into creating real time ray-tracing capable gpus. I tried this exact project a couple months ago where I created an implementation of ray tracing that took about 30 seconds to render a frame. This was on account of me having my 4 core 4 thread CPU do the rendering. Jump forward to recently, I decided to try again but with GPU support to allow for really fast renders.

## Problems

The first major problem that actually caused me to stop working on this for a while was problems with saving the intersection matrix as a bitmap. The implementations that I found online always caused problems, making it look like there were weird scan lines. There were clear alignment issues with the design.
