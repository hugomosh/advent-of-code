use std::{ops::Add, time::Instant};

use crypto::{digest::Digest, md5::Md5};

pub fn main() {
    println!("Aoc Year: 2015 Day: 04");

    let input = String::from("bgvyzdsv");
    //let input = String::from("bgvyzdsv");
    //Ramon's input: "iwrupvqb" takes more time
    dbg!(&input);
    let mut t = Instant::now();
    let res2 = solve_part2(&input);
    dbg!(t.elapsed().as_millis());

    dbg!(&res2);
    t = Instant::now();
    let res = solve_part1(&input);
    dbg!(t.elapsed().as_millis());

    dbg!(&res);

    let digest2 = md5::compute(b"abcdef609043");
    dbg!(digest2);
    dbg!(format!("{:x}", digest2).starts_with("00000"));

    assert_eq!(solve_part1(&String::from("abcdef")), String::from("609043"));
    assert_eq!(
        solve_part1(&String::from("pqrstuv")),
        String::from("1048970")
    );

    assert_eq!(res, String::from("254575"));
    assert_eq!(res2, String::from("1038736"));
}

pub fn solve_part1(input: &String) -> String {
    let mut i = 0;
    let mut sh = Md5::new();
    // clone seems better than &format!("{}{:?}", input, i)
    sh.input_str(&input.clone().add(&i.to_string()));

    while !sh.result_str().starts_with("00000") {
        sh.reset();
        i += 1;
        sh.input_str(&input.clone().add(&i.to_string()));
    }

    return i.to_string();
}

pub fn solve_part2(input: &String) -> String {
    let mut i = 0;
    let mut sh = Md5::new();
    sh.input_str(&input.clone().add(&i.to_string()));

    while !sh.result_str().starts_with("000000") {
        sh.reset();
        i += 1;
        sh.input_str(&input.clone().add(&i.to_string()));
    }

    return i.to_string();
}
