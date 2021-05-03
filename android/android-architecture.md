# Android Architecture

<figure>
  <img src="https://developer.android.com/guide/platform/images/android-stack_2x.png" alt="Android stack">
  <figcaption>Android Architecture Diagram</figcaption>
</figure>

- Applications - Applications is the top layer of android architecture. The pre-installed applications like home, contacts, camera, 
gallery etc and third party applications downloaded from the play store like chat applications, games etc. will be installed on this layer only.
It runs within the Android run time with the help of the classes and services provided by the application framework.
- Application framework – Application Framework provides several important classes which are used to create an Android application. 
It provides a generic abstraction for hardware access and also helps in managing the user interface with application resources. 
Generally, it provides the services with the help of which we can create a particular class and make that class helpful for the Applications creation.
- Application runtime – Android Runtime environment is one of the most important part of Android. 
It contains components like core libraries and the Dalvik virtual machine(DVM). Mainly, 
it provides the base for the application framework and powers our application with the help of the core libraries.
- Platform libraries – The Platform Libraries includes various C/C++ core libraries and Java based libraries such as Media, Graphics, Surface Manager, OpenGL etc. 
to provide a support for android development. 
  - **Media library** provides support to play and record an audio and video formats.
  - **Surface manager** responsible for managing access to the display subsystem.
  - **SGL** and **OpenGL** both cross-language, cross-platform application program interface (API) are used for 2D and 3D computer graphics.
  - **SQLite** provides database support and FreeType provides font support.
  - **Web-Kit** This open source web browser engine provides all the functionality to display web content and to simplify page loading.
  - **SSL (Secure Sockets Layer)** is security technology to establish an encrypted link between a web server and a web browser.
- Linux Kernel – Linux Kernel is heart of the android architecture. It manages all the available drivers such as display drivers, camera drivers, Bluetooth drivers, audio drivers, memory drivers, etc. which are required during the runtime.
The Linux Kernel will provide an abstraction layer between the device hardware and the other components of android architecture. It is responsible for management of memory, power, devices etc.
  - The features of Linux kernel are:
    - **Security**: The Linux kernel handles the security between the application and the system.
    - **Memory Management**: It efficiently handles the memory management thereby providing the freedom to develop our apps.
    - **Process Management**: It manages the process well, allocates resources to processes whenever they need them.
    - **Network Stack**: It effectively handles the network communication.
    - **Driver Model**: It ensures that the application works properly on the device and hardware manufacturers responsible for building their drivers into the Linux build.

## Useful links:

- [Android docs architecture](https://developer.android.com/topic/libraries/architecture)
