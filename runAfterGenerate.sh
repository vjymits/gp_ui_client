#! /bin/sh
#
# Copyright 2013-2015 Synchronoss Technologies, Inc.  All Rights Reserved.
#
# This source code is the confidential and proprietary information of
# Synchronoss Technologies, Inc.
#
# ("Confidential Information"). You shall not disclose such Confidential
# Information and shall use it only in accordance with the terms of the
# license agreement you entered into with Synchronoss Technologies.
#

if [ $# -ne 2 ]
then
  echo "Usage: $0 <artifactId> <package name>"
  exit
fi

originalArtifactId=${1}
artifactId=`echo $originalArtifactId | perl -pe 's/-\K(\w)/\U$1/g' | sed -e 's/-//g'`
artifactId="$(tr '[:lower:]' '[:upper:]' <<< ${artifactId:0:1})${artifactId:1}"
packageName=${2}
lowercaseArtifactId=`echo $artifactId | tr '[:upper:]' '[:lower:]'`
packageFolder=`echo $packageName | sed -e 's/\./\//g'`
shortPackageFolder=`echo $packageFolder | sed -e 's!com/synchronoss/!!g'`

reversePackageName=""
for w in `echo $packageName | sed -e 's/\./ /g'`
do
    reversePackageName="$w $reversePackageName"
done
reversePackageName=`echo $reversePackageName | sed -e 's/ /\./g'`

reversePackageFolder=`echo $reversePackageName | sed -e 's/\./\//g'`
shortReversePackageFolder=`echo $reversePackageFolder | sed -e 's!/synchronoss/com!!g'`

echo "-----------------------------------------------------------------------------------"
echo "artifactId: $originalArtifactId"
echo "artifactId for Java File Name: $artifactId"
echo "lowercaseArtifactId: $lowercaseArtifactId"
echo "packageName: $packageName"
echo "packageFolder: $packageFolder"
echo "shortPackageFolder: $shortPackageFolder"
echo "reversePackageName: $reversePackageName"
echo "reversePackageFolder: $reversePackageFolder"
echo "shortReversePackageFolder: $shortReversePackageFolder"
echo "-----------------------------------------------------------------------------------"

# clean up first...if target folders exist, it causes some trouble
rm -rf target
rm -rf */target
rm -rf *.iml
rm -rf */*.iml

# rename project props
for f in package.json
do
  echo 'Rename Project Properties'
  sed -e "s/Portal Seed/${artifactId}/g" \
  < $f > tmp
  mv tmp $f
done

# rename pom attributes
for f in pom.xml
do
  echo Updating git repo and description: $f
  sed -e "s/Portal Seed/${artifactId}/g" \
      -e "s/portal-seed/${artifactId}/g" \
  < $f > tmp
  mv tmp $f
done

# Adding .gitignore file by default (SNCRGW-44)
echo "*/target/" > .gitignore
echo "*/.iml" >> .gitignore
echo "*/.ipr" >> .gitignore
echo "*/.iws" >> .gitignore
echo ".idea" >> .gitignore
echo "out/" >> .gitignore
echo "build/" >> .gitignore
echo "**/.DS_Store" >> .gitignore
echo "rest/overlays/**" >> .gitignore