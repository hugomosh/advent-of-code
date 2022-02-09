use std::{ops::Add, time::Instant};

pub fn main() {
    let year = 2015;
    let day = 10;
    println!("Aoc Year {} Day: {:02}", year, day);
    let t: Instant;

    let input = "1113122113".to_string(); // std::fs::read_to_string(format!("../input/{}/{:02}.txt", year, day)).unwrap();
    dbg!(&input);

    t = Instant::now();
    let res = solve_part1(&input);
    dbg!(t.elapsed().as_millis());
    dbg!(&res);
    /*
    t = Instant::now();
    let res2 = solve_part2(list.clone());
    dbg!(t.elapsed().as_micros());
    dbg!(&res2); */
}

pub fn solve_part1(input: &String) -> String {
    let mut res = input.clone();
    let mut prev_c;
    let mut next_string;
    let mut count_c;
    for _i in 0..50 {
        count_c = 0;
        next_string = "".to_string();
        prev_c = res.chars().next().unwrap();
        for c in res.chars() {
            if prev_c == c {
                count_c += 1;
            } else {
                if count_c > 0 {
                    next_string.push_str(&count_c.to_string());
                    next_string.push(prev_c);
                }
                prev_c = c;
                count_c = 1;
            }
        }
        next_string.push_str(&count_c.to_string());
        next_string.push(prev_c);
        res = next_string.clone();
    }
    res.len().to_string()
}

#[test]
fn test_solve1() {
    assert_eq!(solve_part1(&r#"1"#.to_string()), "2".to_string());
}
