# ec2-facts
NPM Package to save AWS EC2 Instance Metadata into a Puppet Custom Facts

## Installation

```
$ sudo npm install -g ec2-facts
```

_or_

```
$ sudo npm install -g --ignore-scripts ec2-facts
```

> **Current Release**
>
> _Alpha_ v0.0.6 is here! A lot of changes is on the way!

## Configuration

`ec2-facts` searches and reads a JSON formatted file named `ec2-facts.conf.json` in `/etc`.

```
{
  "externalFactsFolder":"/some/folder"
}
```

__Parameters__

* `externalFactsFolder` - _string_ Location of Facter's external facts e.g. `/some/folder`
* `factNamePrefix` - _string_ Fact name prefix e.g. `ec2-static-`

__Parameters (under development)__

* `exclude` - _array_ Metadata to exclude  e.g. `['instance-type', 'mac']`



## Usage

```
# ec2-facts
```

## Release Notes (Alpha Version)  

1. Currently fetches the following metadata:
  * ami-id
  * ami-launch-index
  * ami-manifest-path
  * ancestor-ami-ids
  * instance-id
  * instance-type
  * kernel-id
  * local-hostname
  * local-ipv4
  * mac
  * availability-zone
  * product-codes
  * public-hostname
  * public-ipv4
  * ramdisk-id
  * reservation-id
  * security-groups
  * services-domain
  * spot-termination-time
  * _more metadata on next release :)_

2. Facts are saved in JSON format.
3. Default external facts folder is: `/etc/facter/facts.d`
