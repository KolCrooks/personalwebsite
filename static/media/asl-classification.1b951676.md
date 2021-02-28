?> This article is based on a research paper that I wrote with a friend in highschool for one of my classes. You can view the original paper [here](%asl_pdf%).

## Introduction

Voice transcription has been one of the largest applications of machine learning. With 21.3 million individuals using smart speakers in the US alone, the market for this service is huge. The goal for this project was to expand the scope of what can be transcribed to Sign Language by creating a transcription/translation application that can preform the algorithm in real time. The applications of this could be from enabling more fluid conversations between deaf and hearing people, to creating a smart speaker system that could be more intuitive for a deaf individual to use.

## Existing Research

At the time of making this project, there had been nothing exactly like this developed. In the past, people have made applications that used a microsoft connect, or specially designed gloves to get information on the movement of the person's hands. Part of the goal of this project was to make this software accessible and lightweight, in other words, anyone with a phone would be able to use it.

## Method

In order to make the problem as accessible and light weight as possible, we decided on a web based application that clipped each movement and then used a C# server for processing the movements. This is because the 2d CNN was light weight enough were it was able to run on a phone while the 3D CNN required a full gpu to run well. The final plans that we decided on was this structure:

![program architecture](%architecture_graph%)

Where we just had the front end to record the video and return the output, with WebRTC being the method of communicating with the server. While this is how the final application would function, most of the programming was done in python + tensorflow to train the neural networks.

## Video Processing

To improve the quality of the data that would be passed into the algorithm, we put the data through multiple steps:

1. scale down the image
2. Make the image gray scale
3. Replace the background to isolate the moving objects

The progression of the image looks like this:

![base image](%processing/base.jpg%)
![resized image](%processing/resized.jpg%)
![grey scale image](%processing/grey.jpg%)
![background removed image](%processing/segmented.jpg%)

## The Algorithm

We used a simple 2D CNN that predicts when the person starts and stops a sign. This is required because the method that we used could not have frames streamed in, but required sets of frames that were assumed to be individual signs. These clips would then be processed by the 3D CNN and it would output a predicted classifier. We had trouble getting a large dataset so we only had three signs that it could identify. These were the final results of the algorithm:

![accuracy graph](%accuracy.png%)

Looking back, we should have probably included a no sign class so that there was not a chance of false positives. Overall, the dataset was the most limiting factor for the project. As you can see by this graph:

![accuracy vs loss](%accuracy_v_loss.png%)

If we had more data to raise the epoch count without overfitting the data, and drive the loss further down, and make the accuracy more consistent.

## The Server and the Client

The server side of this was written in C# and loaded in the NN that was trained by our python scripts. There is not much to say about it besides it just accepting an RTC stream and receiving data from the web client, and then returning text as the classification output. The client was similiar with it just being HTML that loaded a script that would send data to the server and then receive the response. It also loaded and used a 2D CNN via tensorflow's js library. (If I were to write the client again I would do it in react.)

## Source Code

If you are interested in the source code for this project you can view it [here](https://github.com/KolCrooks/signLanguageDetection).
