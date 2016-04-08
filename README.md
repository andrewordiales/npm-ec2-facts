# ec2-facts
NPM Package to save AWS EC2 Instance Metadata into a Puppet Custom Facts

## Installation

```
$ sudo npm install ec2-facts -g
```

> **Current Release**
>
> Alpha version is here! A lot of changes is on the way!

## Notes on Alpha Version  

1. Currently fetches only 2 metadata:
  * instance-id
  * availability-zone
  * _more metadata on next release :)_

2. Facts are saved in JSON format.
3. Default external facts folder is: `/etc/facter/facts.d`
