# ec2-facts
NPM Package to save AWS EC2 Instance Metadata into a Puppet Custom Facts

## Installation

```
$ sudo npm install -g ec2-facts
```

> **Current Release**
>
> _Alpha_ v0.0.2 is here! A lot of changes is on the way!

## Configuration

`ec2-facts` searches and reads a JSON formatted file named `ec2-facts.conf.json` in `/etc`.

| Configuration Parameter | Description |
| --- | --- |
| `externalFactsFolder`| Location of Facter's external facts |

```
{
  "externalFactsFolder":"/some/folder"
}
```


## Usage

```
# ec2-facts
```

## Notes on Alpha Version  

1. Currently fetches the following metadata:
  * ami-id
  * ami-launch-index
  * availability-zone
  * instance-id
  * instance-type
  * public-hostname
  * public-ipv4
  * _more metadata on next release :)_

2. Facts are saved in JSON format.
3. Default external facts folder is: `/etc/facter/facts.d`
