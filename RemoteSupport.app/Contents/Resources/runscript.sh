cd /tmp
rm -rf remotesupport
echo "Downloading... This may take awhile"
git clone git://github.com/Sxw1212/remotesupport.git
echo "Starting!"
bash remotesupport/startagent.sh
echo "Bye!"
rm -rf remotesupport
