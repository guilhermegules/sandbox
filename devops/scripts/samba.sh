#!/bin/bash

echo "Preencher com a nova senha do protocolo SAMBA: "

read sambaPass

smbpasswd $sambaPass
