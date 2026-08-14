# Input / Output in C programming language

**The syntax for opening a file in standard I/O is:**

`fopen("fileopen","mode");`

**For example:**

```c
fopen("E:\\cprogram\\newprogram.txt","w");

fopen("E:\\cprogram\\oldprogram.bin","rb");
```

**Closing a file**

`fclose(file_object);`

## Opening Modes in Standard I/O

| Mode  | Meaning of Mode                                        | During Inexistence of file                                                                        |
| ----- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| `r`   | Open for reading.                                      | If the file does not exist, `fopen()` returns NULL                                                |
| `rb`  | Open for reading in binary mode.                       | If the file does not exist, `fopen()` returns NULL.                                               |
| `w`   | Open for writing.                                      | If the file exists, its contents are overwritten. If the file does not exist, it will be created. |
| `wb`  | Open for writing in binary mode.                       | If the file exists, its contents are overwritten. If the file does not exist, it will be created. |
| `a`   | Open for append. Data is added to the end of the file. | If the file does not exist, it will be created.                                                   |
| `ab`  | Open for append in binary mode.                        | Data is added to the end of the file. If the file does not exist, it will be created.             |
| `r+`  | Open for both reading and writing.                     | If the file does not exist, `fopen()` returns NULL.                                               |
| `rb+` | Open for both reading and writing in binary mode.      | If the file does not exist, `fopen()` returns NULL.                                               |
| `w+`  | Open for both reading and writing.                     | If the file exists, its contents are overwritten. If the file does not exist, it will be created. |
| `wb+` | Open for both reading and writing in binary mode.      | If the file exists, its contents are overwritten. If the file does not exist, it will be created. |
| `a+`  | Open for both reading and appending.                   | If the file does not exist, it will be created.                                                   |
| `ab+` | Open for both reading and appending in binary mode.    | If the file does not exist, it will be created.                                                   |
