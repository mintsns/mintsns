#!/bin/bash
ansible-playbook -i development --connection=local -vvv playbook.yml
