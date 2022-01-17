use std::collections::HashSet;

pub fn main() {
    println!("Aoc Year: 2015 Day: 03");

    let input = std::fs::read_to_string("../input/2015/03.txt").unwrap();

    dbg!(&input[..10]);

    let res = solve_part1(&input);
    dbg!(res);
    assert_eq!(solve_part1(&String::from(">")), 2);
    assert_eq!(solve_part1(&String::from("^>v<")), 4);
    assert_eq!(solve_part1(&String::from("^v^v^v^v^v")), 2);

    assert_eq!(res, 2565);

    let res2 = solve_part2(&input);
    dbg!(res2);
    assert_eq!(res, 2639);
    assert_eq!(solve_part2(&String::from("^v")), 3);
    assert_eq!(solve_part2(&String::from("^>v<")), 3);
    assert_eq!(solve_part2(&String::from("^v^v^v^v^v")), 11);
}

pub fn solve_part1(input: &String) -> usize {
    let mut current_house = (0, 0);
    let mut visited_houses = HashSet::<(i32, i32)>::new();

    visited_houses.insert(current_house);

    for c in input.chars() {
        match c {
            '>' => current_house.1 += 1,
            '<' => current_house.1 -= 1,
            '^' => current_house.0 += 1,
            'v' => current_house.0 -= 1,
            _ => println!("Bad input"),
        }
        visited_houses.insert(current_house);
    }

    visited_houses.len()
}

pub fn solve_part2(input: &String) -> usize {
    let mut current_house = (0, 0);
    let mut current_house_robot = (0, 0);

    let mut visited_houses = HashSet::<(i32, i32)>::new();
    let mut visited_houses_robot = HashSet::<(i32, i32)>::new();

    visited_houses.insert(current_house);
    visited_houses_robot.insert(current_house_robot);

    for (i, c) in input.chars().enumerate() {
        if i % 2 == 0 {
            match c {
                '>' => current_house.1 += 1,
                '<' => current_house.1 -= 1,
                '^' => current_house.0 += 1,
                'v' => current_house.0 -= 1,
                _ => println!("Bad input"),
            }
            visited_houses.insert(current_house);
        } else {
            match c {
                '>' => current_house_robot.1 += 1,
                '<' => current_house_robot.1 -= 1,
                '^' => current_house_robot.0 += 1,
                'v' => current_house_robot.0 -= 1,
                _ => println!("Bad input"),
            }
            visited_houses_robot.insert(current_house_robot);
        }
    }

    visited_houses.union(&visited_houses_robot).count()
}
