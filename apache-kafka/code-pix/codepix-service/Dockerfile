FROM golang:1.19

WORKDIR /go/src
ENV PATH="/go/bin:${PATH}"
ENV GO111MODULE=on
ENV CGO_ENABLED=1

RUN apt-get update 

RUN apt-get install build-essential protobuf-compiler librdkafka-dev -y 

RUN go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.3.0 

RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.31.0 

RUN go install github.com/spf13/cobra-cli@v1.3.0 

RUN wget https://github.com/ktr0731/evans/releases/download/0.9.1/evans_linux_amd64.tar.gz 

RUN tar -xzvf evans_linux_amd64.tar.gz 

RUN mv evans ../bin && rm -f evans_linux_amd64.tar.gz

CMD ["tail", "-f", "/dev/null"]