use std::{collections::HashSet, time::Instant};

pub fn main() {
    let year = 2016;
    let day = 01;
    println!("Aoc Year {} Day: {:02}", year, day);
    let mut t: Instant;

    let input = std::fs::read_to_string(format!("../input/{}/{:02}.txt", year, day)).unwrap();
    dbg!(&input[..13]);

    t = Instant::now();
    let res = solve_part1(&input);
    dbg!(t.elapsed().as_micros());
    dbg!(&res);

    t = Instant::now();
    let res2 = solve_part2(&input);
    dbg!(t.elapsed().as_micros());
    dbg!(&res2);
    //1342
    //152
}

pub fn solve_part1(input: &String) -> String {
    let mut coords = (0, 0);
    let mut directions = vec![(1, 0), (0, 1), (-1, 0), (0, -1)];
    let mut current_direction = 0;

    input.split(", ").into_iter().for_each(|x| {
        let d = &x[..1];
        let distance: i32 = x[1..].parse::<i32>().unwrap_or(0);

        match d {
            "L" => {
                current_direction = if current_direction == 0 {
                    3
                } else {
                    current_direction - 1
                };
            }
            "R" => current_direction = (current_direction + 1) % 4,
            _ => {}
        }

        let vec = directions.get(current_direction).unwrap_or(&(0, 0));
        coords.0 += vec.0 * distance;
        coords.1 += vec.1 * distance;
    });

    (coords.0.abs() + coords.1.abs()).to_string()
}

pub fn solve_part2(input: &String) -> String {
    let mut coords = (0, 0);
    let mut directions = vec![(1, 0), (0, 1), (-1, 0), (0, -1)];
    let mut current_direction = 0;
    let mut visited: HashSet<(i32, i32)> = HashSet::new();
    visited.insert(coords);
    for x in input.split(", ").into_iter() {
        let d = &x[..1];
        let distance: i32 = x[1..].parse::<i32>().unwrap_or(0);

        match d {
            "L" => {
                current_direction = if current_direction == 0 {
                    3
                } else {
                    current_direction - 1
                };
            }
            "R" => current_direction = (current_direction + 1) % 4,
            _ => {}
        }

        let vec = directions.get(current_direction).unwrap_or(&(0, 0));

        for _ in 1..distance + 1 {
            coords.0 += vec.0 * 1;
            coords.1 += vec.1 * 1;
            if visited.contains(&coords) {
                return (coords.0.abs() + coords.1.abs()).to_string();
            } else {
                visited.insert(coords);
            }
        }
    }

    (coords.0.abs() + coords.1.abs()).to_string()
}

#[test]
fn test_solve1() {
    assert_eq!(
        solve_part1(&r#"R5, L5, R5, R3"#.to_string()),
        "12".to_string()
    );
}
#[test]
fn test_solve2() {
    assert_eq!(
        solve_part2(&r#"R8, R4, R4, R8"#.to_string()),
        "4".to_string()
    );
}
