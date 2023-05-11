#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use dirs;

use std::{process::Command, vec};
use tauri::{Event, Manager,Window};
use std::{thread, time};
use serde::Serialize;


#[derive(Debug, Serialize, Clone)]
struct downloading_files_data_info
{
    file: String,
    up:String,
    down:String,
    status:i32, 
    remaining:String,
    seed:i32
}
// struct fileTransferInfo
// {
//     name: String,
//     chunks:i32,
//     fileHash:String,
//     seeds:i32, 
//     source:String
// }




// #[tauri::command]
// fn sendFileInfo(window:Window) {
//   let fileInfo1 = fileTransferInfo {
//     name: "JohnWick2720p.mp4".into(),
//     chunks: 25,
//     fileHash: "dhshdjsh7787wehjw6473".into(),
//     seeds:5,
//     source:"iffy222,fsjhdjs333,...".into()
//   };
//   let fileInfo2 = fileTransferInfo {
//     name: "JohnWick1720p.mp4".into(),
//     chunks: 22,
//     fileHash: "dhshdjsh7sds787wehjw6473".into(),
//     seeds:15,
//     source:"iffy222sa,fsjhdjs333,...".into()
//   };

//   let file = vec![fileInfo1,fileInfo2]; 
//   window.emit("myEvent", file.clone()).unwrap();
// }


#[tauri::command]
fn store_string_from_search_tab(window:Window,searchString: String) -> String {
  
let recent_search_file = searchString;
thread::sleep(time::Duration::from_secs(5));
remote_data_files(window);
return recent_search_file;
}


#[tauri::command]
fn upload_file_from_dir(selectedFile: String) -> String {
let uploaded_file = selectedFile;

return uploaded_file;
}


#[tauri::command]
fn download_file_from_remotefiles(window:Window)  {
  
  std::thread::spawn(move || {
    // for i in 1..100{
    
      let only_one_download_file = downloading_files_data_info{
      file: "JohnWick12720p.mp4".into(),
      up: "4MB/s".into(),
      down: "5MB/s".into(),
      status:85,
      remaining:"5 minutes".into(),
      seed: 7,
    };
    
    let vector_file_of_downloading_files = vec![only_one_download_file]; 
    window.emit("event-transfer",vector_file_of_downloading_files.clone()).unwrap();
    thread::sleep(time::Duration::from_secs(1));
  });
}


#[derive(Debug, Serialize, Clone)]
struct remote_files_data_info
{
    name: String,
    chunks:i32,
    fileHash:String,
    seeds:i32, 
    source:String
}

#[tauri::command]
fn open_file_location_of_recenlty_downloaded_file() {
  let downloads_dir = dirs::download_dir().unwrap().to_str().unwrap().to_string();
let file_name = "assignment1.txt";
let file_path = format!("{}\\{}", downloads_dir, file_name);

  Command::new("explorer")
      .args(["/select,", &file_path])
      .spawn()
      .unwrap();
}


#[tauri::command]
fn remote_data_files(window: Window) {

  std::thread::spawn(move || {
    println!("data");
    let data_of_file_1 = remote_files_data_info {
      name: "JohnWick2720p.mp4".into(),
      chunks: 25,
      fileHash: "dhshdjsh7787wehjw6473".into(),
      seeds:5,
      source:"iffy222,fsjhdjs333,...".into()
    };
    let data_of_file_2 = remote_files_data_info{
      name: "JohnWick1720p.mp4".into(),
      chunks: 22,
      fileHash: "dhshdjsh7sds787wehjw6473".into(),
      seeds:15,
      source:"iffy222sa,fsjhdjs333,...".into()
    };
  
    let vector_file_of_data_of_files = vec![data_of_file_1,data_of_file_2]; 
   
    // thread::sleep(time::Duration::from_secs(5));
      window.emit("event-name", vector_file_of_data_of_files.clone()).unwrap();
      
     
 
  });
}



// #[tauri::command]
// fn init_process1(window: Window) {
    
//   std::thread::spawn(move || {
//     // for i in 1..100{

   
   
    
//       let transfer1 = transferRequest{
//       file: "JohnWick12720p.mp4".into(),
//       up: "4MB/s".into(),
//       down: "5MB/s".into(),
//       status:85,
//       remaining:"5 minutes".into(),
//       seed: 7,
//     };
//     let transfer2 = transferRequest{
//       file: "JohnWick22720p.mp4".into(),
//       up: "4MB/s".into(),
//       down: "5MB/s".into(),
//       status:0,
//       remaining:"5 minutes".into(),
//       seed: 7,
//     };
//     let transfer_file = vec![transfer1,transfer2]; 
//     window.emit("event-transfer", transfer_file.clone()).unwrap();
//     thread::sleep(time::Duration::from_secs(1));
//   }

//   );




 
   


// }





fn main() {
  tauri::Builder::default()
  
      .invoke_handler(tauri::generate_handler![remote_data_files, upload_file_from_dir,store_string_from_search_tab,download_file_from_remotefiles, open_file_location_of_recenlty_downloaded_file])
      .run(tauri::generate_context!())
      .expect("error while running tauri application"); 
}
